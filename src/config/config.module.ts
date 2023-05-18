

import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './metrics/health.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from '@config/configuration/configuration';
import { AppLoggerService } from './logger/app.logger.service';
import secretsConfiguration from '@config/configuration/secrets-configuration';
import { AppCryptoService } from '@src/config/crypto/app.crypto.service';
import { MongooseModule } from '@nestjs/mongoose';
import { YapeChallengeMongooseConfigService } from '@src/config/mongoose/yapechallenge-mongoose-config.service';

/**
 * General module definition, setup configuration for Metrics, Logger and Config loader
 */
@Module({
	imports: [
		MongooseModule.forRootAsync({
			useClass: YapeChallengeMongooseConfigService,
		}),
		TerminusModule,
		ConfigModule.forRoot({
			load: [configuration, secretsConfiguration],
			isGlobal: true
		}),
	],
	controllers: [HealthController],
	providers: [AppLoggerService, { provide: 'AppCryptoService', useClass: AppCryptoService }],
	exports: [AppLoggerService, { provide: 'AppCryptoService', useClass: AppCryptoService }]
})
export class ConfigurationModule { }
