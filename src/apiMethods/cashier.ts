import {
  CreateMoneyStorageData,
  GetAccountsByMoneyStoragesListParams,
  GetAccountsWithMoneyStoragesListParams,
  GetMoneyStorageListSort,
  UpdateCurrencyData,
  UpdateMoneyStorageData
} from '@typings/api/cashier';
import { CashierService } from '@typings/api/generated';
import { ID } from '@typings/common';

export const getCurrenciesListApi = () => {
  return CashierService.currenciesControllerGetList({});
};

export const getMoneyStoragesApi = ({
  order,
  sort,
}: GetMoneyStorageListSort) => {
  return CashierService.moneyStoragesControllerGetList({
    order,
    sort,
  });
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

export const getAccountsByMoneyStoragesApi = ({
  sort,
}: Pick<GetAccountsByMoneyStoragesListParams, 'sort'> = {}) => {
  return CashierService.accountsControllerGetAccountsByMoneyStoragesList({
    sort,
  });
};

export const getAccountsWithMoneyStoragesApi = ({
  page,
  pageSize,
  order,
  sort,
}: GetAccountsWithMoneyStoragesListParams = {}) => {
  return CashierService.accountsControllerGetList({
    page,
    pageSize,
    order,
    sort,
  });
};

export const deleteCurrencyApi = (currentId: ID) => {
  return CashierService.currenciesControllerRemoveItem({ id: currentId.toString() });
};

export const updateCurrencyApi = (
  currentId: ID,
  newData: UpdateCurrencyData,
) => {
  return CashierService.currenciesControllerUpdateItem({
    id: currentId.toString(),
    requestBody: newData,
  });
};

