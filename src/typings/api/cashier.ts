import { 
  CashierService,
  GetAccountsByStoreDto,
  MoneyStorageDto,
} from './generated';

export type UpdateMoneyStorageData =
  Parameters<typeof CashierService.moneyStoragesControllerUpdateItem>[0]['requestBody'];

export type CreateMoneyStorageData =
  Parameters<typeof CashierService.moneyStoragesControllerCreateItem>[0]['requestBody'];

export type GetAccountsByMoneyStoragesListParams =
  Parameters<typeof CashierService.accountsControllerGetAccountsByMoneyStoragesList>[0];

export type MoneyStorage = MoneyStorageDto;
export type MoneyStorageStatus = MoneyStorageDto['status'];
export const MoneyStorageStatusEnum = MoneyStorageDto['status'];
export type AccountsByStore = GetAccountsByStoreDto

