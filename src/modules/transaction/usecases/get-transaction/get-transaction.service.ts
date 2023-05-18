import { Inject, Injectable, Logger } from '@nestjs/common';
import { CommandExecutor } from '@modules/libs/domain/command/command-executor.interface';
import { concatMap, map, Observable, of } from 'rxjs';
import { Transaction } from '@src/modules/transaction/domain/model/transaction.interface';
import { TransactionRepositoryPort } from '@src/modules/transaction/domain/port/transaction.repository.port';
import { GetTransactionCommand } from '@src/modules/transaction/domain/command/get-transaction/get-transaction-command.interface';
import { ConflictTransactionException } from '@src/modules/libs/domain/exception/transaction.exception';

@Injectable()
export class GetTransaction implements CommandExecutor<Transaction> {

	private readonly logger = new Logger(GetTransaction.name);

	public messageExcepcionTransaction: string;

	constructor(
		@Inject('TransactionsRepository') private transactionsRepository: TransactionRepositoryPort){ }

	execute(command: GetTransactionCommand): Observable<Transaction> {
		/**
		 * Find Transaction.
		 */

		const findTransaction = (_command: GetTransactionCommand): Observable<Transaction> => {
			return this.transactionsRepository.get(_command.transactionExternalId, _command.value, _command.createdAt ).pipe(
				map(transaction => {
					if (!transaction) {
						this.messageExcepcionTransaction = 'Transaction is not registered in the system.';
						this.logger.warn(this.messageExcepcionTransaction);
						throw new ConflictTransactionException(this.messageExcepcionTransaction);
					}
					this.logger.log('Transaction found.');
					return transaction;
				})
			);
		};

		return of(command).pipe(
			concatMap( c => findTransaction(c)),
		);

	}

}