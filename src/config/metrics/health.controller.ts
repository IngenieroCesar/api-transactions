

import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';

/**
 * Controller to expose metrics information
 */
@Controller('health')
export class HealthController {
	constructor(private health: HealthCheckService) { }

	/**
	 * Health check resource definition
	 * @returns 
	 */
	@Get()
	@HealthCheck()
	check() {
		return this.health.check([]);
	}
}
