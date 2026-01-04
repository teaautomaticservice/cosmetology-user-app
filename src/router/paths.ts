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
  currencies: '/currencies',
  transactions: '/transactions',

  // history
  history: '/history',

  test: (userId: string = ':id', val: string = ':number') => `/users/${userId}/new-test/${val}`,
};
