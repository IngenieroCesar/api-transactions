

import { Inject, Injectable, Logger } from '@nestjs/common';
import { CommandExecutor } from '@modules/libs/domain/command/command-executor.interface';
import { concatMap, from, map, Observable, of, tap } from 'rxjs';
import { Transaction } from '@src/modules/transaction/domain/model/transaction.interface';
import { CreateTransactionCommand } from '@src/modules/transaction/domain/command/create-transaction/create-transaction-command.interface';
import * as moment from 'moment-timezone';
import { ConfigService } from '@nestjs/config';
import { ConfigValue } from '@src/config/configuration/model/constants';
import { MomentConfig } from '@src/config/configuration/model/moment-config';
import { v4 as uuidv4 } from 'uuid';
import { TransactionConsts } from '@src/modules/transaction/domain/constants/transaction-constants';

@Injectable()
export class CreateTransaction implements CommandExecutor<Transaction> {

	private readonly logger = new Logger(CreateTransaction.name);

	public messageExcepcionGetProjectByTitle: string;

	constructor(
		private readonly configurationService: ConfigService){ }

	private readonly momentConfig: MomentConfig = this.configurationService.get<MomentConfig>(ConfigValue.MOMENT_ENV_VALUE);

	execute(command: CreateTransactionCommand): Observable<Transaction> {

		/**
		 * Create Transaction with pending status.
		 * Save Transaction with pending status event
		 */


		const createProject = (_command: CreateTransactionCommand): Observable<Transaction> => {
			const transaction: Transaction = {
				id: uuidv4(),
				status: TransactionConsts.transactionStatus.pending,
				accountExternalIdDebit: _command.accountExternalIdCredit,
				accountExternalIdCredit: _command.accountExternalIdDebit,
				tranferTypeId: _command.tranferTypeId,
				value: _command.value,
				createdAt: moment().tz(this.momentConfig.tz).format(this.momentConfig.format),
				updatedAt: moment().tz(this.momentConfig.tz).format(this.momentConfig.format)
			};

			console.log(transaction);
			
			return of(transaction).pipe(
				tap(() => this.logger.log(`Transaction with id: [${transaction.id}] created succesfully.`))
			);
		};

		return of(command).pipe(
			concatMap( c => createProject(c)),
		);

	}

}