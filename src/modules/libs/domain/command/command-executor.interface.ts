

import { Observable } from 'rxjs';
import { Model } from '../model/model.interface';
import { Command } from './command.interface';

/**
 * General abstraction for command execution
 */
export interface CommandExecutor<T extends Model> {

    /**
     * Mand method to execute command
     * @param command Command to be executed 
     */
    execute(command: Command): Observable<T>;
}
