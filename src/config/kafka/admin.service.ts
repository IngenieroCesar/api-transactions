import {
	Injectable,
	OnApplicationShutdown,
	OnModuleInit,
} from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { Kafka, Admin, PartitionOffset } from 'kafkajs';
import { ConfigService } from '@nestjs/config';
import { KafkaConfig } from '@src/config/configuration/model/kafka-config';
import { ConfigValue } from '@src/config/configuration/model/constants';

/**
 * @AdminService is a admin client hosts all the cluster operations.
 */
  
@Injectable()
export class AdminService implements OnModuleInit, OnApplicationShutdown {

	constructor(private readonly configurationService: ConfigService){}

	private readonly kafkaConfig: KafkaConfig = this.configurationService.get<KafkaConfig>(ConfigValue.STREAMS_KAFKA_ENV_VALUE);

	private readonly kafka = new Kafka({
		brokers: [`${this.kafkaConfig.url}:${this.kafkaConfig.port}`],
	});

	private readonly admin: Admin = this.kafka.admin();

	onModuleInit() : Observable<void> {
		return from(this.admin.connect());
	}
	/**
	 * @getCurrentKafkaOffset return offset information about a topic.
	 */
  
	getCurrentKafkaOffset(topic: string) : Observable<(PartitionOffset & { high: string; low: string; })[]> {
		return from(this.admin.fetchTopicOffsets(topic));
	}
  
	onApplicationShutdown() : Observable<void> {
		return from(this.admin.disconnect());
	}
}