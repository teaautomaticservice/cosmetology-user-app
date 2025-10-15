import { CreateMoneyStorageData, UpdateMoneyStorageData } from '@typings/api/cashier';
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

export const updateMoneyStorageApi = ({
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

export const createMoneyStorageApi = (newData: CreateMoneyStorageData) => {
  return CashierService.moneyStoragesControllerCreateItem({ requestBody: newData });
};

export const deleteMoneyStorageApi = (currentId: ID) => {
  return CashierService.moneyStoragesControllerRemoveItem({ id: currentId.toString() });
};
