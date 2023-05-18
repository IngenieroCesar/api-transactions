import { Model } from '@src/modules/libs/domain/model/model.interface';

export interface Transaction extends Model {
	id?: string;
	accountExternalIdDebit: string;
	accountExternalIdCredit: string;
	tranferTypeId: number;
	value: number;
	status: 'pending' | 'approved' | 'rejected';
	createdAt?: string;
	updatedAt?: string;
}
