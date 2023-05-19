import { Observable } from 'rxjs';
import { Transaction } from '../model/transaction.interface';

export interface TransactionRepositoryPort {

    /**
     * @create is a definition to generate Transaction on system.
     * @returns 
     */
    create(project: Transaction): Observable<Transaction>;

    /**
     * @updateState is a definition to update Transaction state on system.
     * @returns Observable<Transaction>
     */
    update(project: Transaction): Observable<Transaction>;

    /**
     * @findById is a definition to find a Transaction by id on a system.
     * @returns 
     */
    findById(id: string): Observable<Transaction>;

    /**
     * @get is a definition to find a Transaction on a system.
     * @returns 
     */
    get(transactionExternalId: string, value: number, createdAt: string): Observable<Transaction>;

}