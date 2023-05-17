

import { Observable } from 'rxjs';
import { Model } from '../model/model.interface';
import { Query } from './query.interface';

/**
 * General abstraction for query execution
 */
export interface QueryExecutor<T extends Model> {

    execute(query: Query): Observable<T>;
}
