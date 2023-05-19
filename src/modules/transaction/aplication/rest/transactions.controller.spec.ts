import { TransactionsController } from './transactions.controller';
import { Transaction } from '@src/modules/transaction/domain/model/transaction.interface';
import { firstValueFrom, of } from 'rxjs';
import { TransactionRepositoryPort } from '@src/modules/transaction/domain/port/transaction.repository.port';
import { ConfigService } from '@nestjs/config';
import { CreateTransaction } from '@src/modules/transaction/usecases/create-transaction/create-transaction.service';
import { GetTransaction } from '@src/modules/transaction/usecases/get-transaction/get-transaction.service';
import { CreateTransactionDto, GetTransactionDto} from './dtos/transactions.dtos';
import { ProducerService } from '@src/config/kafka/producer.service';
import { ConsumerService } from '@src/config/kafka/consumer.service';
import { UpdateTransactionStatus } from '@src/modules/transaction/usecases/update-transaction-status/update-transaction-status.service';



/**
 * Unit test for TransactionController
 */
describe('TransactionController', () => {
	let configService: ConfigService;
	let port: TransactionRepositoryPort;
	let controller: TransactionsController;
	let producer: ProducerService;
	let consumer: ConsumerService;
	let createTransaction: CreateTransaction;
	let updateTransactionStatus: UpdateTransactionStatus;
	let getTransaction: GetTransaction;

	beforeEach(() => {
		configService = new ConfigService();
		createTransaction = new CreateTransaction(port,configService, producer);
		updateTransactionStatus = new UpdateTransactionStatus(port,configService);
		getTransaction = new GetTransaction(port);
		controller = new TransactionsController(createTransaction, updateTransactionStatus, getTransaction, consumer, configService );
	});

	it('should be defined', () => {

		expect(controller).toBeDefined();

	});

	const mockTransaction: Transaction = {
		'id': 'ce9ffd6f-1bb4-4e1c-a55e-4eb01e2cd6e1',
		'accountExternalIdDebit': 'Guid',
		'accountExternalIdCredit': 'Guid',
		'tranferTypeId': 1,
		'value': 1200,
		'status': 'rejected',
		'createdAt': '18/05/2023 19:34:31',
		'updatedAt': '18/05/2023 19:34:32'
	};

	describe('create transaction', () => {

		it('should return an transaction', async () => {

			const command: CreateTransactionDto = {
				'accountExternalIdDebit': 'Guid',
				'accountExternalIdCredit': 'Guid',
				'tranferTypeId': 1,
				'value': 1200
			};

			const spyCreateTransaction = jest.spyOn(createTransaction, 'execute').mockReturnValue(of(mockTransaction));
			const result: Transaction = await firstValueFrom(controller.create(command));

			expect(result).toEqual(mockTransaction);
			expect(spyCreateTransaction).toHaveBeenCalled();
		});
	});


	describe('get transaction', () => {
		it('should return transaction', async () => {
			const command: GetTransactionDto = {
				'transactionExternalId': 'Guid',
				'transactionType': {
					'name': ''
				},
				'transactionStatus': {
					'name': ''
				},
				'value': 1200,
				'createdAt': '18/05/2023 19:34:31'
			};

			const spyReportTransactionState = jest.spyOn(getTransaction, 'execute').mockReturnValue(of(mockTransaction));
			const result: Transaction = await firstValueFrom(controller.get( command ));

			expect(result).toEqual(mockTransaction);
			expect(spyReportTransactionState).toHaveBeenCalled();
		});
	});

});
