

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TransactionsController } from './aplication/rest/transactions.controller';
import { CreateTransaction } from './usecases/create-transaction/create-transaction.service';

@Module({
	controllers: [TransactionsController],
	imports: [
		HttpModule,
	],
	providers: [
		{ provide: 'CreateTransaction', useClass: CreateTransaction },
	]
})
export class TransactionModule { }