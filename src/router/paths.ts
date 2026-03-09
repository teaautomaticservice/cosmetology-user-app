import { TransactionsParams } from '@components/pages/transactions/useTransactionsParams';

export const paths = {
  // unauthorized
  login: '/login',

  // service
  completeRegistration: '/complete-registration',

  // dashboards
  main: '/',
  moneyStorages: '/money-storages',
  accounts: '/accounts',
  accountsAggregated: '/accounts/aggregated',
  accountsByStorage: '/accounts/by-storage',
  obligationAccounts: '/accounts/obligation',
  currencies: '/currencies',
  transactions: (params?: Pick<TransactionsParams, 'anyAccountIds'>) =>
    params?.anyAccountIds ? `/transactions?anyAccountIds[]=${params.anyAccountIds}` : '/transactions',

  // history
  history: '/history',

  test: (userId: string = ':id', val: string = ':number') => `/users/${userId}/new-test/${val}`,
};
