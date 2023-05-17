

import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { CommandExecutor } from '@src/modules/libs/domain/command/command-executor.interface';
import { Transaction } from '@src/modules/transaction/domain/model/transaction.interface';
import { Observable } from 'rxjs';
import { CreateTransactionDto } from './dtos/transactions.dtos';

/**
 * @TransactionsController is responsible for handling incoming requests and returning responses to the transaction.
 */

@Controller('transactions')

export class TransactionsController {

	constructor(
		@Inject('CreateTransaction') private createTransaction: CommandExecutor<Transaction>,
	) { }

	/**
	 * @create is a POST method than create a transaction.
	 * Mandatory fields to be received: accountExternalIdDebit, accountExternalIdCredit,tranferTypeId, value.
	 * @returns 204 status code when Transaction is created, 400 status when missing mandatory fields.
	 *
	 * @CreateTransactionDto is a dto validator from rest request.
	 * @returns 400 status code when some field is incorrect.
	 */

	@Post()
	@HttpCode(HttpStatus.NO_CONTENT)
	create(@Body() payload: CreateTransactionDto): Observable<Transaction> {
		return this.createTransaction.execute(payload);
	}

}
