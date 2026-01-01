import { getSearchParams } from '@shared/utils/getSearchParams';
import {
  CreateAccount,
  CreateCurrencyData,
  CreateMoneyStorageData,
  GetAccountsAggregatedWithMoneyStoragesListParams,
  GetAccountsByMoneyStoragesListParams,
  GetAccountsControllerListParams,
  GetMoneyStorageListSort,
  NewTransaction,
  UpdateAccountData,
  UpdateAccountListData,
  UpdateCurrencyData,
  UpdateMoneyStorageData
} from '@typings/api/cashier';
import { CashierService } from '@typings/api/generated';
import { ID } from '@typings/common';

export const getCurrenciesListApi = () => {
  const { currenciesPage, currenciesPageSize } = getSearchParams<{
    currenciesPage?: string;
    currenciesPageSize?: string;
  }>();
  return CashierService.currenciesControllerGetList({
    ...(currenciesPage && { page: Number(currenciesPage) }),
    ...(currenciesPageSize && { pageSize: Number(currenciesPageSize) }),
  });
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
  moneyStoragesIds,
  status,
  query,
}: GetAccountsControllerListParams = {}) => {
  return CashierService.accountsControllerGetList({
    page,
    pageSize,
    order,
    sort,
    moneyStoragesIds,
    status,
    query,
  });
};

export const getAccountsAggregatedWithMoneyStoragesApi = ({
  page,
  pageSize,
  order,
  sort,
}: GetAccountsAggregatedWithMoneyStoragesListParams = {}) => {
  return CashierService.accountsControllerGetAccountsAggregatedWithStorageList({
    page,
    pageSize,
    order,
    sort,
  });
};

export const createAccountApi = (newData: CreateAccount) => {
  return CashierService.accountsControllerCreateAccount({
    requestBody: newData,
  });
};

export const deleteAccountApi = (currentId: ID) => {
  return CashierService.accountsControllerRemoveItem({ id: currentId.toString() });
};

export const updateAccountApi = (
  currentId: ID,
  newData: UpdateAccountData,
) => {
  return CashierService.accountsControllerUpdateItem({
    id: currentId.toString(),
    requestBody: newData,
  });
};

export const updateMultiplyAccountsApi = (
  newData: UpdateAccountListData,
) => {
  return CashierService.accountsControllerUpdateItems({
    requestBody: newData,
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

export const createCurrencyApi = (newData: CreateCurrencyData) => {
  return CashierService.currenciesControllerCreateCurrency({
    requestBody: newData,
  });
};

export const getTransactionsListApi = () => {
  return CashierService.transactionsControllerGetList({});
};

export const createOpenBalanceApi = (newData: NewTransaction) => {
  return CashierService.transactionsControllerOpenBalance({
    requestBody: newData,
  });
};

export const createCashOutApi = (newData: NewTransaction) => {
  return CashierService.transactionsControllerCashOut({
    requestBody: newData,
  });
};
