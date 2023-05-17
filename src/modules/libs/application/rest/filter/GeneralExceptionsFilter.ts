

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

/**
 * ExceptionFilter implementation for custome genric response in rest layer
 */
@Catch()
export class GeneralExceptionsFilter implements ExceptionFilter {

	private readonly logger = new Logger(GeneralExceptionsFilter.name);

	constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

	catch(exception: unknown, host: ArgumentsHost): void {

		const { httpAdapter } = this.httpAdapterHost;

		const ctx = host.switchToHttp();

		const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

		const responseBody = exception instanceof HttpException ? new MessageResponse(exception as HttpException): null;

		this.logger.error(`Handling error [${exception}]: \nDetail: [${JSON.stringify(responseBody)}]`);

		httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
	}

}

/**
 * Standard response for error cases
 */
export class MessageResponse {

	constructor(exception: HttpException) {
		this.message = exception.getResponse() instanceof Object ? (exception.getResponse() as any).message : exception.getResponse();
		this.timestamp = new Date().toISOString();
	}

	message: string;
	timestamp: string;

}
