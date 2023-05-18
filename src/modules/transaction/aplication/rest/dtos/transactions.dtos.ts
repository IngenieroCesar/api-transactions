import { IsString, IsNumber, IsNotEmpty} from 'class-validator';

export class CreateTransactionDto {

    @IsNotEmpty()
    @IsString()
	readonly accountExternalIdDebit: string;

	@IsNotEmpty()
    @IsString()
    readonly accountExternalIdCredit: string;

	@IsNotEmpty()
    @IsNumber()
	readonly tranferTypeId: number;

	@IsNotEmpty()
    @IsNumber()
	readonly value: number;

}

class TransactionType {
    @IsString()
	readonly name: string;
}

class TransactionStatus {
    @IsString()
	readonly name: string;
}

export class GetTransactionDto {

    @IsNotEmpty()
    @IsString()
	readonly transactionExternalId: string;

	@IsNotEmpty()
    readonly transactionType: TransactionType;

	@IsNotEmpty()
	readonly transactionStatus: TransactionStatus;

	@IsNotEmpty()
    @IsNumber()
	readonly value: number;

    @IsNotEmpty()
    @IsString()
	readonly createdAt: string;

}