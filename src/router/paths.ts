import { TransactionsParams } from '@components/pages/transactions/useTransactionsParams';
import { buildSearchParams } from '@shared/utils/buildSearchParams';
import { GetAccountsControllerListParams } from '@typings/api/cashier';

export const paths = {
  // unauthorized
  login: '/login',

  // service
  completeRegistration: '/complete-registration',

  // dashboards
  main: '/',
  moneyStorages: '/money-storages',
  accounts: (params?: Pick<GetAccountsControllerListParams, 'query'>) =>
    params ? `/accounts?${buildSearchParams(params)}` : '/accounts',
  accountsAggregated: '/accounts/aggregated',
  accountsByStorage: '/accounts/by-storage',
  obligationAccounts: '/accounts/obligation',
  currencies: '/currencies',
  transactions: (params?: Pick<TransactionsParams, 'anyAccountIds'>) =>
    params ? `/transactions?${buildSearchParams(params)}` : '/transactions',

  // history
  history: '/history',

  test: (userId: string = ':id', val: string = ':number') => `/users/${userId}/new-test/${val}`,
};
