import { UseSort } from './common';
import {
  CashierService,
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

export type GetAccountsWithMoneyStoragesListParams =
  Parameters<typeof CashierService.accountsControllerGetList>[0];

export type MoneyStorage = MoneyStorageDto;
export type MoneyStorageStatus = MoneyStorageDto['status'];
export const MoneyStorageStatusEnum = MoneyStorageDto['status'];

export type AccountsByStore = GetAccountsByStoreDto;
export type Account = GetAccountDto;

export type AccountsWithStore = GetAccountWithStorageDto;

