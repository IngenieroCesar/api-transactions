import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = TransactionEntity & Document;

@Schema()
export class TransactionEntity {
	
    @Prop()
	readonly id: string;

    @Prop()
    readonly accountExternalIdDebit: string;

    @Prop()
    readonly accountExternalIdCredit: string;

    @Prop()
    readonly tranferTypeId: number;

    @Prop()
    readonly value: number;

    @Prop()
    readonly status: 'pending' | 'approved' | 'rejected';

    @Prop()
    readonly createdAt: string;

    @Prop()
    readonly updatedAt: string;

}

export const TransactionSchema = SchemaFactory.createForClass(TransactionEntity);