

import { Command } from '@modules/libs/domain/command/command.interface';

export class CreateTransactionCommand implements Command {

	constructor(accountExternalIdDebit: string, accountExternalIdCredit: string, tranferTypeId: number, value: number ){
		this.accountExternalIdDebit = accountExternalIdDebit;
		this.accountExternalIdCredit = accountExternalIdCredit;
		this.tranferTypeId = tranferTypeId;
		this.value = value;
	}

	accountExternalIdDebit: string;
	accountExternalIdCredit: string;
	tranferTypeId: number;
	value: number;
}