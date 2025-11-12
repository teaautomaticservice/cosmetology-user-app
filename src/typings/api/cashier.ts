import { UseSort } from './common';
import {
  CashierService,
  CreateAccountDto,
  CurrencyDto,
  GetAccountAggregatedWithStorage,
  GetAccountDto,
  GetAccountsByStoreDto,
  GetAccountWithStorageDto,
  MoneyStorageDto,
} from './generated';

export type GetMoneyStorageListParams =
  Parameters<typeof CashierService.moneyStoragesControllerGetList>[0];
export type GetMoneyStorageListSort = UseSort<GetMoneyStorageListParams['sort']>;

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

export type AccountsByStore = GetAccountsByStoreDto;
export type Account = GetAccountDto;

export type AccountWithStore = GetAccountWithStorageDto;
export type AccountAggregatedWithStorage = GetAccountAggregatedWithStorage;

export type CreateAccount = CreateAccountDto;

export type Currency = CurrencyDto;
export type CurrencyStatus = CurrencyDto['status'];
export const CurrencyStatusEnum = CurrencyDto['status'];

export type UpdateCurrencyData =
  Parameters<typeof CashierService.currenciesControllerUpdateItem>[0]['requestBody'];
export type CreateCurrencyData =
  Parameters<typeof CashierService.currenciesControllerCreateCurrency>[0]['requestBody'];
