import { AuthorizedLayout } from '@components/layouts/authorizedLayout/AuthorizedLayout';
import { DashboardLayout } from '@components/layouts/dashboardLayout/DashboardLayout';
import { GenericLayout } from '@components/layouts/genericLayout/GenericLayout';
import { AccountsPage } from '@components/pages/accounts/AccountsPage';
import { AccountsAggregatedPage } from '@components/pages/accounts/aggregated/AccountsAggregatedPage';
import { AccountsByStoragePage } from '@components/pages/accounts/byStorage/AccountsByStoragePage';
import { CompleteRegistrationPage } from '@components/pages/completeRegistration/CompleteRegistrationPage';
import { CurrenciesPage } from '@components/pages/currencies/CurrenciesPage';
import { HistoryPage } from '@components/pages/history/HistoryPage';
import { LoginPage } from '@components/pages/login/LoginPage';
import { MainPage } from '@components/pages/main/MainPage';
import { MoneyStoragePage } from '@components/pages/moneyStorage/MoneyStoragePage';
import { TransactionsPage } from '@components/pages/transactions/TransactionsPage';

import { paths } from './paths';
import { RouterPage, RouterRoleEnum } from './types';

const unauthorized: RouterPage[] = [
  {
    path: paths.login,
    Layout: GenericLayout,
    Component: LoginPage,
    roles: [RouterRoleEnum.UNAUTHORIZED],
  },
];

const service: RouterPage[] = [
  {
    path: paths.completeRegistration,
    Layout: GenericLayout,
    Component: CompleteRegistrationPage,
    roles: [RouterRoleEnum.UNAUTHORIZED, RouterRoleEnum.PENDING],
  },
];

const dashboards: RouterPage[] = [
  {
    path: paths.main,
    Layout: DashboardLayout,
    Component: MainPage,
    roles: [RouterRoleEnum.OPERATOR],
  },
  {
    path: paths.moneyStorages,
    Layout: DashboardLayout,
    Component: MoneyStoragePage,
    roles: [RouterRoleEnum.OPERATOR],
  },
  {
    path: paths.accounts,
    Layout: DashboardLayout,
    Component: AccountsPage,
    roles: [RouterRoleEnum.OPERATOR],
  },
  {
    path: paths.accountsAggregated,
    Layout: DashboardLayout,
    Component: AccountsAggregatedPage,
    roles: [RouterRoleEnum.OPERATOR],
  },
  {
    path: paths.accountsByStorage,
    Layout: DashboardLayout,
    Component: AccountsByStoragePage,
    roles: [RouterRoleEnum.OPERATOR],
  },
  {
    path: paths.transactions,
    Layout: DashboardLayout,
    Component: TransactionsPage,
    roles: [RouterRoleEnum.OPERATOR],
  },
  {
    path: paths.currencies,
    Layout: DashboardLayout,
    Component: CurrenciesPage,
    roles: [RouterRoleEnum.OPERATOR],
  }
];

const history: RouterPage[] = [
  {
    path: paths.history,
    Layout: AuthorizedLayout,
    Component: HistoryPage,
    roles: [RouterRoleEnum.OPERATOR],
  },
];

export const routerConfig: RouterPage[] = [
  ...unauthorized,
  ...service,
  ...dashboards,
  ...history,
];
