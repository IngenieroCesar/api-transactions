import { Module } from '@nestjs/common';
import { ConfigurationModule } from '@config/config.module';
import { TransactionModule } from '@src/modules/transaction/transaction.module';

/**
 * Base module definiton
 */
@Module({
	imports: [
		ConfigurationModule,
		TransactionModule,
	],
	controllers: [],
	providers: [],
	exports: []
})
export class AppModule {}
