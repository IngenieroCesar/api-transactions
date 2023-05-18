import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongodbConfing, SecMongodbConfig } from '@src/config/configuration/model/mongodb-config';
import { ConfigValue } from '@src/config/configuration/model/constants';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class YapeChallengeMongooseConfigService implements MongooseOptionsFactory {

	constructor(private readonly configurationService: ConfigService){}

	createMongooseOptions(): MongooseModuleOptions {

		const mongodbConfig: MongodbConfing = this.configurationService.get<MongodbConfing>(ConfigValue.MONGODB_YAPECHALLENGE_ENV_VALUE);
		const secMongodbConfig: SecMongodbConfig = this.configurationService.get<SecMongodbConfig>(ConfigValue.SEC_YAPECHALLENGE_MONGODB_ENV_VALUE);
		const mongoServerUrl = `mongodb://${secMongodbConfig.user}:${secMongodbConfig.password}@${mongodbConfig.url}/${mongodbConfig.database}?authSource=admin&readPreference=primary`;
		return {
			uri: mongoServerUrl,
		};
	}
}