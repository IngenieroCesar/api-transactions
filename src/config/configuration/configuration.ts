

import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'config.yaml';

/**
 * Default config to load properties from external yaml file
 */
export default () => {
	return yaml.load(
		readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
	) as Record<string, any>;
};