import { Body, Controller, HttpCode, HttpStatus, Inject, Post, OnModuleInit } from '@nestjs/common';
import { CommandExecutor } from '@src/modules/libs/domain/command/command-executor.interface';
import { Transaction } from '@src/modules/transaction/domain/model/transaction.interface';
import { Observable } from 'rxjs';
import { CreateTransactionDto } from './dtos/transactions.dtos';
import { ConsumerService } from '@src/config/kafka/consumer.service';
import { ConfigService } from '@nestjs/config';
import { KafkaConfig } from '@src/config/configuration/model/kafka-config';
import { ConfigValue } from '@src/config/configuration/model/constants';

/**
 * @TransactionsController is responsible for handling incoming requests and returning responses to the transaction.
 */

@Controller('transactions')

export class TransactionsController implements OnModuleInit{

	constructor(
		@Inject('CreateTransaction') private createTransaction: CommandExecutor<Transaction>,
		private readonly consumerService: ConsumerService,
		private readonly configurationService: ConfigService
	) { }

	private readonly kafkaConfig: KafkaConfig = this.configurationService.get<KafkaConfig>(ConfigValue.STREAMS_KAFKA_ENV_VALUE);

	/**
	 * @create is a POST method than create a transaction.
	 * Mandatory fields to be received: accountExternalIdDebit, accountExternalIdCredit,tranferTypeId, value.
	 * @returns 204 status code when Transaction is created, 400 status when missing mandatory fields.
	 *
	 * @CreateTransactionDto is a dto validator from rest request.
	 * @returns 400 status code when some field is incorrect.
	 */

	@Post()
	@HttpCode(HttpStatus.NO_CONTENT)
	create(@Body() payload: CreateTransactionDto): Observable<Transaction> {
		return this.createTransaction.execute(payload);
	}

	async onModuleInit() : Promise<void> {
		await this.consumerService.consume(
			{topic: this.kafkaConfig.bindings.topicName.sendTransactionStatusApproved},
			{
				eachMessage: async ({topic, partition, message}) => {
					console.log({
						value: message.value.toString(),
						topic: topic.toString(),
						partition: partition.toString()
					});
				}
			});

		await this.consumerService.consume(
			{topic: this.kafkaConfig.bindings.topicName.sendTransactionStatusRejected},
			{
				eachMessage: async ({topic, partition, message}) => {
					console.log({
						value: message.value.toString(),
						topic: topic.toString(),
						partition: partition.toString()
					});
				}
			});
	}

}
