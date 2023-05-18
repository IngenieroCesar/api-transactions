import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
	Consumer,
	ConsumerRunConfig,
	ConsumerSubscribeTopic,
	Kafka,
} from 'kafkajs';
import { ConfigService } from '@nestjs/config';
import { KafkaConfig, SecKafkaConfig } from '@src/config/configuration/model/kafka-config';
import { ConfigValue } from '@src/config/configuration/model/constants';
import { from, Observable } from 'rxjs';


/**
 * @ConsumerService is a consumer client to receibe messages from topics.
 */


@Injectable()
export class ConsumerService implements OnApplicationShutdown {

	constructor(private readonly configurationService: ConfigService){}

	private readonly kafkaConfig: KafkaConfig = this.configurationService.get<KafkaConfig>(ConfigValue.STREAMS_KAFKA_ENV_VALUE);
	private readonly secKafkaConfig: SecKafkaConfig = this.configurationService.get<SecKafkaConfig>(ConfigValue.SEC_STREAMS_KAFKA_ENV_VALUE);

	private readonly kafka = new Kafka({
		clientId: this.kafkaConfig.clientId,
		brokers: [`${this.kafkaConfig.url}:${this.kafkaConfig.port}`],
		sasl: { username: this.secKafkaConfig.key, password: this.secKafkaConfig.secret, mechanism: this.secKafkaConfig.mechanism },
		ssl: true
	});

	private readonly consumers: Consumer[] = [];

	async consume(topic: ConsumerSubscribeTopic, config: ConsumerRunConfig) {

		const consumer = this.kafka.consumer({ groupId: this.kafkaConfig.bindings.groupId.yapeFlow });
		await consumer.connect();
		await consumer.subscribe(topic);
		await consumer.run(config);
		this.consumers.push(consumer);

	}

	onApplicationShutdown(): Observable<null> {
		for (const consumer of this.consumers) {
			from(consumer.disconnect());
		}
		return null;
	}
}