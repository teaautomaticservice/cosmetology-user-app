import { CashierService } from './generated';

export type UpdateMoneyStorageData =
  Parameters<typeof CashierService.moneyStoragesControllerUpdateItem>[0]['requestBody'];

export type CreateMoneyStorageData =
  Parameters<typeof CashierService.moneyStoragesControllerCreateItem>[0]['requestBody'];

