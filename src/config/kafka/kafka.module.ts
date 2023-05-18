import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ProducerService } from './producer.service';
import { AdminService } from './admin.service';

@Module({
	providers: [ProducerService, ConsumerService, AdminService],
	exports: [ProducerService, ConsumerService, AdminService],
})
export class KafkaModule {}