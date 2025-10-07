export const paths = {
  // unauthorized
  login: '/login',

  // service
  completeRegistration: '/complete-registration',

  // dashboards
  main: '/',
  moneyStorages: '/money-storages',

  // history
  history: '/history',

  test: (userId: string = ':id', val: string = ':number') => `/users/${userId}/new-test/${val}`,
};
