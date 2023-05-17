

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigValue } from '@src/config/configuration/model/constants';
import { AES, enc } from 'crypto-js';
import { SecCryptoConfig } from '../configuration/model/crypto-config';

@Injectable()
export class AppCryptoService {

	constructor(private readonly configurationService: ConfigService){}

	private readonly secCryptoConfig: SecCryptoConfig = this.configurationService.get<SecCryptoConfig>(ConfigValue.SEC_CRYPTO_CRIPTOINVESTMENT_ENV_VALUE);

	encode( object: object ): string {
		const data = JSON.stringify(object);
		return AES.encrypt(data, this.secCryptoConfig.key).toString();
	}

	decode( data: string): object {
		const bytes = AES.decrypt( data, this.secCryptoConfig.key);
		return JSON.parse(bytes.toString(enc.Utf8));
	}
}