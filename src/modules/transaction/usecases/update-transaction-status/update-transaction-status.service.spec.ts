import { ConfigService } from '@nestjs/config';
import { UpdateTransactionStatus } from './update-transaction-status.service';
import { TransactionRepositoryPort } from '@src/modules/transaction/domain/port/transaction.repository.port';

describe('UpdateTransactionStatus', () => {
	let port: TransactionRepositoryPort;
	let configService: ConfigService;
	let service: UpdateTransactionStatus;

	beforeEach(async () => {
		configService = new ConfigService();
		service = new UpdateTransactionStatus(port,configService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
