import { UseSort } from './common';
import {
  CashierService,
  CreateAccountDto,
  CurrencyDto,
  GetAccountAggregatedWithStorage,
  GetAccountDto,
  GetAccountsByStoreDto,
  GetAccountWithStorageDto,
  GetTransactionDto,
  MoneyStorageDto,
  NewLoanDto,
  NewLoanRepaymentDto,
  NewOpenBalanceObligationDto,
  NewTransactionDto,
  NewTransferDto,
} from './generated';

export { TransactionStatus } from './generated';

export type GetMoneyStorageListParams =
  Parameters<typeof CashierService.moneyStoragesControllerGetList>[0];
export type GetMoneyStorageListSort = UseSort<GetMoneyStorageListParams['sort']>;
export type GetObligationStoragesListParams =
  Parameters<typeof CashierService.moneyStoragesControllerGetObligationAccounts>[0];

export type UpdateMoneyStorageData =
  Parameters<typeof CashierService.moneyStoragesControllerUpdateItem>[0]['requestBody'];

export type CreateMoneyStorageData =
  Parameters<typeof CashierService.moneyStoragesControllerCreateItem>[0]['requestBody'];

export type GetAccountsByMoneyStoragesListParams =
  Parameters<typeof CashierService.accountsControllerGetAccountsByMoneyStoragesList>[0];

export type GetAccountsControllerListParams =
  Parameters<typeof CashierService.accountsControllerGetList>[0];

export type GetAccountsAggregatedWithMoneyStoragesListParams =
  Parameters<typeof CashierService.accountsControllerGetAccountsAggregatedWithStorageList>[0];

export type MoneyStorage = MoneyStorageDto;
export type MoneyStorageStatus = MoneyStorageDto['status'];
export const MoneyStorageStatusEnum = MoneyStorageDto['status'];
export type MoneyStorageType = MoneyStorageDto['type'];
export const MoneyStorageTypeEnum = MoneyStorageDto['type'];

export type AccountsByStore = GetAccountsByStoreDto;
export type Account = GetAccountDto;
export type AccountWithStore = GetAccountWithStorageDto;
export type AccountAggregatedWithStorage = GetAccountAggregatedWithStorage;
export type AccountWithStorageStatus = `${GetAccountWithStorageDto['status']}`;
export const AccountWithStorageStatusEnum = GetAccountWithStorageDto['status'];
export type CreateAccount = CreateAccountDto;
export type UpdateAccountData =
  Parameters<typeof CashierService.accountsControllerUpdateItem>[0]['requestBody'];
export type UpdateAccountListData =
  Parameters<typeof CashierService.accountsControllerUpdateItems>[0]['requestBody'];

export type Currency = CurrencyDto;
export type CurrencyStatus = CurrencyDto['status'];
export const CurrencyStatusEnum = CurrencyDto['status'];

export type UpdateCurrencyData =
  Parameters<typeof CashierService.currenciesControllerUpdateItem>[0]['requestBody'];
export type CreateCurrencyData =
  Parameters<typeof CashierService.currenciesControllerCreateCurrency>[0]['requestBody'];

export type TransactionsControllerGetListParams =
  Parameters<typeof CashierService.transactionsControllerGetList>[0];
export type Transaction = GetTransactionDto;
export type NewTransaction = NewTransactionDto
export type NewOpenBalanceObligation = NewOpenBalanceObligationDto;
export type NewLoan = NewLoanDto;
export type NewLoanRepayment = NewLoanRepaymentDto;
export type NewTransfer = NewTransferDto;
