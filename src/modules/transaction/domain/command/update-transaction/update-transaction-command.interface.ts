import { Command } from '@modules/libs/domain/command/command.interface';

export class UpdateTransactionCommand implements Command {

	constructor(id: string, status: 'approved' | 'rejected'){
		this.id = id;
		this.status = status;
	}
	id: string;
	status: 'approved' | 'rejected';
}