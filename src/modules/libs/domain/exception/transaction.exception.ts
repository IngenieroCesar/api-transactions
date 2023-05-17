

import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictTransactionException extends HttpException {
	constructor(response: string) {
		super(response, HttpStatus.CONFLICT);
	}
}

export class NotFoundProjectException extends HttpException {
	constructor(response: string) {
		super(response, HttpStatus.NOT_FOUND);
	}
}

export class BadRequestProjectException extends HttpException {
	constructor(response: string) {
		super(response, HttpStatus.BAD_REQUEST);
	}
}
