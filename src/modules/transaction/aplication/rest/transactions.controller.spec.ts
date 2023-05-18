import { ProjectsController } from '../projects.controller';
import {Collection, Loan} from '@src/modules/mca/domain/model/loan.interface';
import { firstValueFrom, of } from 'rxjs';
import { LoanRepositoryPort } from '@src/modules/mca/domain/port/loan.repository.port';
import { LoanProducerPort } from '@src/modules/mca/domain/port/loan.producer.port';
import { ConfigService } from '@nestjs/config';
import { CreateLoan } from '@src/modules/mca/usecases/create-loan/create-loan.service';
import { UpdateLoanState } from '@src/modules/mca/usecases/update-loan-state/update-loan-state.service';
import { UpdateLoanStateDto, GetLoanStateDto, CreateLoanDto } from '../dtos/projects.dtos';
import { ReportSell } from '@src/modules/mca/usecases/report-sell/report-sell.service';
import { ExternalSellProvider } from '../../api/mo/external-sell.provider';
import { LoanReportSell } from '@src/modules/mca/application/api/mo/model/loanReportSell.interface';
import { SellDto } from '../dtos/sell.dtos';
import { Sell } from '@src/modules/mca/domain/model/sell.interface';
import { MerchantsPort } from '@src/modules/mca/domain/port/merchants-api.port';
import { LoanExternalPort } from '@src/modules/mca/domain/port/loan.external.port';
import { GetSellState } from '@src/modules/mca/usecases/get-sell-state/get-sell-state.service';
import { GetSellStatus } from '@src/modules/mca/application/rest/loans/dtos/GetSellState.dtos';
import { GetLoanState } from '@src/modules/mca/usecases/get-loan-state/get-loan-state.service';
import { Disburse } from '@src/modules/mca/usecases/disburse/disburse.service';


/**
 * Unit test for MCA LoanController
 */
describe('LoanController', () => {
	let configService: ConfigService;
	let port: LoanRepositoryPort;
	let controller: ProjectsController;
	let createLoan: CreateLoan;
	let updateLoanState: UpdateLoanState;

	beforeEach(() => {
		configService = new ConfigService();
		createLoan = new CreateLoan(port,configService);
		updateLoanState = new UpdateLoanState(port, configService);
		controller = new ProjectsController(createLoan, updateLoanState);
	});

	it('should be defined', () => {

		expect(controller).toBeDefined();

	});

	const mockLoan: Loan = {
		'id': 'idLoanReference',
		'merchant': {id:'merchantIdReference'},
		'amount': 123.9,
		'currency': 'COP',
		'creationDate': 'We042022 063742',
		'updateDate': 'We042022 063742',
		'collections': [],
	};

	describe('create loan', () => {

		it('should return an loan', async () => {

			const command: CreateLoanDto = {
				'id': 'idLoanReference',
				'merchant': '2345',
				'amount': 123.9,
				'currency': 'COP'};

			const spyCreateLoan = jest.spyOn(createLoan, 'execute').mockReturnValue(of(mockLoan));
			const result: Loan = await firstValueFrom(controller.create(command));

			expect(result).toEqual(mockLoan);
			expect(spyCreateLoan).toHaveBeenCalled();
		});
	});

	describe('update loan state', () => {
		it('should return an loan', async () => {

			const mockParam = 'idLoanReference';
			const mockBody: UpdateLoanStateDto = { state: 'ACTIVE' };

			const spyUpdateLoanState = jest.spyOn(updateLoanState, 'execute').mockReturnValue(of(mockLoan));
			const result: Loan = await firstValueFrom(controller.updateState(mockParam, mockBody));

			expect(result).toEqual(mockLoan);
			expect(spyUpdateLoanState).toHaveBeenCalled();
		});
	});

	describe('report sell state', () => {
		it('should return an loan', async () => {

			const payload: SellDto = {
				id: 'idSell',
				amount: 123
			};
			const mockSell: Sell = {
				payuReference: 'idSell',
				externalReference: '5',
				amount: 123,
				collectAmount: 12,
				loan: mockLoan,
				detail: {
					LOAN_CAPITAL: 1,
					LOAN_INTEREST: 2,
					LOAN_ADMON_FEE: 3,
					LOAN_IVA_ADMON_FEE: 4,
					LOAN_OVERDUE_INTEREST: 5,
					LOAN_COLLECTION_MANAGEMENT: 6,
					LOAN_IVA_COLLECTION_MANAGEMENT: 7
				}
			};
			const resultLoan: LoanReportSell = {
				LOAN_CAPITAL: 1,
				LOAN_INTEREST: 2,
				LOAN_ADMON_FEE: 3,
				LOAN_IVA_ADMON_FEE: 4,
				LOAN_OVERDUE_INTEREST: 5,
				LOAN_COLLECTION_MANAGEMENT: 6,
				LOAN_IVA_COLLECTION_MANAGEMENT: 7
			};

			const mockParam = 'idLoanReference';
			const spyReportsell = jest.spyOn(reportsell, 'execute').mockReturnValue(of(mockSell));
			const result: LoanReportSell = await firstValueFrom(controller.getPercentage(payload, mockParam));

			expect(result).toEqual(resultLoan);
			expect(spyReportsell).toHaveBeenCalled();
		});
	});

	describe('consult a sell state', () => {
		it('should a sell state', async () => {
			const mockCollection: Collection = {
				payuReference: 'payuReference',
				externalReference: 'externalReference',
				amount: 123,
				date: '10062022 151351',
				state: 'CONFIRMED',
			};
			const resultLoan: GetSellStatus = {
				status: 'CONFIRMED'
			};

			const mockParamLoanId = 'idLoanReference';
			const mockParamSellId = 'idLoanReference';
			const spyReportSellStatus = jest.spyOn(getSellState, 'execute').mockReturnValue(of(mockCollection));
			const result: GetSellStatus = await firstValueFrom(controller.consultSellState(mockParamLoanId,mockParamSellId));

			expect(result).toEqual(resultLoan);
			expect(spyReportSellStatus).toHaveBeenCalled();
		});
	});

	describe('consult loan state', () => {
		it('should return loan state', async () => {
			const mockLoanState = 'REQUESTED';
			const resultLoan: GetLoanStateDto = {
				state: 'REQUESTED'
			};

			const mockParamLoanId = 'idLoanReference';
			const spyReportLoanState = jest.spyOn(getLoanState, 'execute').mockReturnValue(of(mockLoanState));
			const result: GetLoanStateDto = await firstValueFrom(controller.consultLoanState( mockParamLoanId ));

			expect(result).toEqual(resultLoan);
			expect(spyReportLoanState).toHaveBeenCalled();
		});
	});

	describe('start disbursement process', () => {

		it('should return an disbursement Id', async () => {

			const country = 'COL';
			const disburseId = '123456789';

			const spyDisburse = jest.spyOn(disburse, 'execute').mockReturnValue(of(disburseId));
			const result: string = await firstValueFrom(controller.disbursement(country));

			expect(result).toEqual(disburseId);
			expect(spyDisburse).toHaveBeenCalled();
		});
	});

});
