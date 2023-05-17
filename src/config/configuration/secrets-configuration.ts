

import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_SECRETS_FILENAME = 'secrets/secrets.yaml';

/**
 * Default config to load secret properties from external yaml file
 */
export default () => {
	return yaml.load(
		readFileSync(join(__dirname, YAML_SECRETS_FILENAME), 'utf8'),
	) as Record<string, any>;
};