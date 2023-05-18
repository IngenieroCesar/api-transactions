import {
	Injectable,
	OnApplicationShutdown,
	OnModuleInit,
} from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { Kafka, Producer, ProducerRecord, RecordMetadata } from 'kafkajs';
import { ConfigService } from '@nestjs/config';
import { KafkaConfig, SecKafkaConfig } from '@src/config/configuration/model/kafka-config';
import { ConfigValue } from '@src/config/configuration/model/constants';
  
/**
 * @ProducerService is a producer client to send messages to topics.
 */

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {

	constructor(private readonly configurationService: ConfigService){}

	private readonly kafkaConfig: KafkaConfig = this.configurationService.get<KafkaConfig>(ConfigValue.STREAMS_KAFKA_ENV_VALUE);
	private readonly secKafkaConfig: SecKafkaConfig = this.configurationService.get<SecKafkaConfig>(ConfigValue.SEC_STREAMS_KAFKA_ENV_VALUE);

	private readonly kafka = new Kafka({
		clientId: this.kafkaConfig.clientId,
		brokers: [`${this.kafkaConfig.url}:${this.kafkaConfig.port}`],
		sasl: { username: this.secKafkaConfig.key, password: this.secKafkaConfig.secret, mechanism: this.secKafkaConfig.mechanism },
		ssl: true
	});

	private readonly producer: Producer = this.kafka.producer({ maxInFlightRequests: 1, transactionTimeout: 10000 });
  
	onModuleInit() : Observable<void> {
		return from(this.producer.connect());
	}
  
	produce(record: ProducerRecord) : Observable<RecordMetadata[]> {
		return from(this.producer.send(record));
	}
  
	onApplicationShutdown() : Observable<void> {
		return from(this.producer.disconnect());
	}
}