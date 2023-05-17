

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppLoggerService } from '@src/config/logger/app.logger.service';
import { ValidationPipe } from '@nestjs/common';

/**
 * Main appi configuration
 */
async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	
	const config: ConfigService = app.get(ConfigService);
	const logger: AppLoggerService = app.get(AppLoggerService);
	const port: string = config.get('app.port');

	/**
	 * @whitelist remove fields that are not in the dto.
	 * @forbidNonWhitelisted send exepcion when fields that are not in the dto.
	 */
	app.useGlobalPipes(new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true
	}));
	app.useLogger(logger);
	logger.log(`Starting api-transactions for [${process.env.NODE_ENV}] environment on port: [${port}]`);
	await app.listen(port);
}
bootstrap();
