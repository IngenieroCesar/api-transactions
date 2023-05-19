import { ConfigService } from '@nestjs/config';
import { CreateTransaction } from './create-transaction.service';
import { ProducerService } from '@src/config/kafka/producer.service';
import { TransactionRepositoryPort } from '@src/modules/transaction/domain/port/transaction.repository.port';

describe('CreateTransaction', () => {
	let port: TransactionRepositoryPort;
	let configService: ConfigService;
	let producer: ProducerService;
	let service: CreateTransaction;

	beforeEach(async () => {
		configService = new ConfigService();
		service = new CreateTransaction(port,configService, producer);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
