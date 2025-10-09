import { UpdateMoneyStorageData } from '@typings/api/cashier';
import { CashierService } from '@typings/api/generated';
import { ID } from '@typings/common';

export const getCurrenciesListApi = () => {
  return CashierService.currenciesControllerGetList({});
};

export const getMoneyStoragesApi = () => {
  return CashierService.moneyStoragesControllerGetList({});
};

export const getObligationAccount = () => {
  return CashierService.moneyStoragesControllerGetObligationAccount();
};

export const updateMoneyStorage =({
  currentId,
  newData,
}: {
  currentId: ID;
  newData: UpdateMoneyStorageData;
}) => {
  return CashierService.moneyStoragesControllerUpdateItem({
    id: currentId.toString(),
    requestBody: newData,
  });
};
