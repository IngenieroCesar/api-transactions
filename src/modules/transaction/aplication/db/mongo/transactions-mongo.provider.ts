import { Injectable, Logger } from '@nestjs/common';
import { Transaction } from '@src/modules/transaction/domain/model/transaction.interface';
import { TransactionRepositoryPort } from '@src/modules/transaction/domain/port/transaction.repository.port';
import { Observable, from, map } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionDocument } from './entity/transaction.entity';

@Injectable()
export class TransactionsMongoProvider implements TransactionRepositoryPort {

	private readonly logger = new Logger(TransactionsMongoProvider.name);

	constructor(
		@InjectModel('transaction') private readonly transactionModel: Model<TransactionDocument>,
	) { }

	findById(id: string): Observable<Transaction> {

		return from(this.transactionModel.findOne({ id: id }).exec());

	}

	create(transaction: Transaction): Observable<Transaction> {

		return from(this.transactionModel.create(transaction));

	}

	update(transaction: Transaction): Observable<Transaction> {

		return from(this.transactionModel.replaceOne({ id: transaction.id }, transaction, {strict: true})).pipe( map( () => transaction));

	}

}