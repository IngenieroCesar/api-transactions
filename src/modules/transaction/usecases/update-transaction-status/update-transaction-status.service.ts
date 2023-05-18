import { Inject, Injectable, Logger } from '@nestjs/common';
import { CommandExecutor } from '@modules/libs/domain/command/command-executor.interface';
import { concatMap, map, Observable, of, tap } from 'rxjs';
import { Transaction } from '@src/modules/transaction/domain/model/transaction.interface';
import * as moment from 'moment-timezone';
import { ConfigService } from '@nestjs/config';
import { ConfigValue } from '@src/config/configuration/model/constants';
import { MomentConfig } from '@src/config/configuration/model/moment-config';
import { UpdateTransactionCommand } from '../../domain/command/update-transaction/update-transaction-command.interface';
import { TransactionRepositoryPort } from '@src/modules/transaction/domain/port/transaction.repository.port';
import { ConflictTransactionException } from '@src/modules/libs/domain/exception/transaction.exception';

@Injectable()
export class UpdateTransactionStatus implements CommandExecutor<Transaction> {

	private readonly logger = new Logger(UpdateTransactionStatus.name);

	public messageExcepcionTransaction: string;

	constructor(
		@Inject('TransactionsRepository') private transactionsRepository: TransactionRepositoryPort, 
		private readonly configurationService: ConfigService){ }

	private readonly momentConfig: MomentConfig = this.configurationService.get<MomentConfig>(ConfigValue.MOMENT_ENV_VALUE);

	execute(command: UpdateTransactionCommand): Observable<Transaction> {

		/**
		 * Find Transaction by id
		 * Update Transaction status
		 */

		const findTransaction = (_command: UpdateTransactionCommand): Observable<Transaction> => {
			return this.transactionsRepository.findById(_command.id).pipe(
				map(transaction => {
					if (!transaction) {
						this.messageExcepcionTransaction = `Transaction [${_command.id}] is not registered in the system.`;
						this.logger.warn(this.messageExcepcionTransaction);
						throw new ConflictTransactionException(this.messageExcepcionTransaction);
					}
					this.logger.log(`Transaction found with id: [${_command.id}]`);
					return transaction;
				})
			);
		};

		const updateTransactionStatus = (_transaction: Transaction, _command: UpdateTransactionCommand): Observable<Transaction> => {
			_transaction.status = _command.status;
			_transaction.updatedAt = moment().tz(this.momentConfig.tz).format(this.momentConfig.format);
			return this.transactionsRepository.update(_transaction).pipe(
				tap(() => this.logger.log(`Transaction with id: [${_transaction.id}] updated succesfully.`)),
				map( () => _transaction)
			);
		};

		return of(command).pipe(
			concatMap( c => findTransaction(c).pipe(
				concatMap( t => updateTransactionStatus(t, c)),
			)),
		);

	}

}