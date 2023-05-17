

import { Command } from '@modules/libs/domain/command/command.interface';
import { Transaction } from '@src/modules/transaction/domain/model/transaction.interface';

export class UpdateProjectCommand implements Command {

	constructor(id:string, transaction: Transaction){
		this.id = id;
		this.transaction = transaction;
	}
	id: string;
	transaction: Transaction;
}