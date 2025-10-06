export const paths = {
  // unauthorized
  login: '/login',

  // service
  completeRegistration: '/complete-registration',

  // mySpace
  main: '/',

  // history
  history: '/history',

  test: (userId: string = ':id', val: string = ':number') => `/users/${userId}/new-test/${val}`,
};
