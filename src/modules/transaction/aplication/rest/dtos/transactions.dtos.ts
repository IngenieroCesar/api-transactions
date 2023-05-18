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