import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
	Consumer,
	ConsumerRunConfig,
	ConsumerSubscribeTopic,
	Kafka,
} from 'kafkajs';
import { ConfigService } from '@nestjs/config';
import { KafkaConfig } from '@src/config/configuration/model/kafka-config';
import { ConfigValue } from '@src/config/configuration/model/constants';
import { from, Observable } from 'rxjs';


/**
 * @ConsumerService is a consumer client to receibe messages from topics.
 */


@Injectable()
export class ConsumerService implements OnApplicationShutdown {

	constructor(private readonly configurationService: ConfigService){}

	private readonly kafkaConfig: KafkaConfig = this.configurationService.get<KafkaConfig>(ConfigValue.STREAMS_KAFKA_ENV_VALUE);

	private readonly kafka = new Kafka({
		brokers: [`${this.kafkaConfig.url}:${this.kafkaConfig.port}`],
	});

	private readonly consumers: Consumer[] = [];

	async consume(groupId: string, topic: ConsumerSubscribeTopic, config: ConsumerRunConfig) {

		const consumer = this.kafka.consumer({ groupId: groupId });
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