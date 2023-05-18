import { Command } from '@modules/libs/domain/command/command.interface';

export class GetTransactionCommand implements Command {

	constructor(transactionExternalId: string, value: number, createdAt: string ){
		this.transactionExternalId = transactionExternalId;
		this.value = value;
		this.createdAt = createdAt;
	}

	transactionExternalId: string;
	value: number;
	createdAt: string;
}