import { CashierService } from '@typings/api/generated';

export const getCurrenciesListApi = () => {
  return CashierService.currenciesControllerGetList({});
};

export const getMoneyStoragesApi = () => {
  return CashierService.moneyStoragesControllerGetList({});
};

export const getObligationAccount = () => {
  return CashierService.moneyStoragesControllerGetObligationAccount();
};
