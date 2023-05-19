import { GetTransaction } from './get-transaction.service';
import { TransactionRepositoryPort } from '@src/modules/transaction/domain/port/transaction.repository.port';

describe('GetTransaction', () => {
	let port: TransactionRepositoryPort;
	let service: GetTransaction;

	beforeEach(async () => {
		service = new GetTransaction(port);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

