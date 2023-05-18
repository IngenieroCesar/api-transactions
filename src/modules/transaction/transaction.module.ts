

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './aplication/db/mongo/entity/transaction.entity';
import { TransactionsMongoProvider } from './aplication/db/mongo/transactions-mongo.provider';
import { TransactionsController } from './aplication/rest/transactions.controller';
import { CreateTransaction } from './usecases/create-transaction/create-transaction.service';
import { KafkaModule } from '@src/config/kafka/kafka.module';

@Module({
	controllers: [TransactionsController],
	imports: [
		/**
		 * For collection name mongoose automatically looks for the plural, lowercased version of your model name.
		 * https://mongoosejs.com/docs/models.html
		 */
		MongooseModule.forFeature([{ name: 'transaction', schema: TransactionSchema }]),
		HttpModule,
		KafkaModule
	],
	providers: [
		{ provide: 'TransactionsRepository', useClass: TransactionsMongoProvider },
		{ provide: 'CreateTransaction', useClass: CreateTransaction },
	]
})
export class TransactionModule { }