

import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';

/**
 * Log different message like: debug, error, log, verbose and warning
 */
@Injectable()
export class AppLoggerService implements LoggerService {

	private readonly logger;

	/**
     * Assign value to the logger
     * @param configurationService The configuration service used to create the logger
     */
	constructor(private readonly configurationService: ConfigService) {

		const loggingLevel = configurationService ? configurationService.get('logging.level') : 'info';
		const loggingDirectory = configurationService ? configurationService.get('logging.directory') : 'logs/';
		const loggingFileName = this.getLoggingFileName();
		const transports = this.getTransports(loggingDirectory, loggingFileName, loggingLevel);

		this.logger = winston.createLogger({
			level: loggingLevel,
			format: winston.format.combine(
				winston.format.errors({ stack: true }),
				winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss,SSS' }),
				winston.format.printf(
					// tslint:disable-next-line:max-line-length
					info => `${info.timestamp} ${info.level.toUpperCase()} --- [] ${info.label} : ${info.message} ${info.stack ? ` -> ${info.stack}` : ''}`,
				),
			),
			transports,
		});
	}

	/**
     * The logger debug
     * @param message The message used to the debug
     * @param context The context used to send the debug
     */
	debug(message: any, context?: string): void {
		this.logger.debug(message, { label: context });
	}

	/**
     * The logger error
     * @param message The message used to the error
     * @param trace The trace used to send the stack of an error
     * @param context The context used to the error
     */
	error(message, trace?, context?: string): void {
		this.logger.error(message, {
			label: context,
			stack: trace.stack || trace,
		});
	}

	/**
     * The logger log
     * @param message The message used to generate the log
     * @param context The context used to generate the log
     */
	log(message: any, context?: string): void {
		this.logger.info(message, { label: context });
	}

	/**
     * The logger verbose
     * @param message The message used to generate the verbose
     * @param context The context used to generate the verbose
     */
	verbose(message: any, context?: string): void {
		this.logger.verbose(message, { label: context });
	}

	/**
     * The logger warn
     * @param message The message used to generate the warn
     * @param context The context used to generate the warn
     */
	warn(message: any, context?: string): void {
		this.logger.warn(message, { label: context });
	}

	/**
     * Returns the logging file name
     */
	private getLoggingFileName() {
		const useHostNameHasFileName = this.configurationService ? this.configurationService.get('logging.hostnameAsFileName') : false;

		let loggingFileName;
		if (useHostNameHasFileName) {
			loggingFileName = this.configurationService.get('HOSTNAME') + '.log';
		} else {
			loggingFileName = this.configurationService ? this.configurationService.get('logging.filename') : 'app.log';
		}
		return loggingFileName;
	}

	/**
     * Returns the transports
     * @param loggingDirectory
     * @param loggingFileName
     * @param loggingLevel
     */
	private getTransports(loggingDirectory, loggingFileName, loggingLevel) {
		const transports = [];

		const consoleTransport = this.configurationService ? this.configurationService.get('logging.transport.console') : true;
		const fileTransport = this.configurationService ? this.configurationService.get('logging.transport.file') : true;

		if (consoleTransport) {
			transports.push(new winston.transports.Console());
		}
		if (fileTransport) {
			transports.push(new winston.transports.File({
				filename: loggingDirectory + loggingFileName,
				level: loggingLevel,
			}));
		}
		return transports;
	}

}
