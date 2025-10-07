import { AuthorizedLayout } from '@components/layouts/authorizedLayout/AuthorizedLayout';
import { DashboardLayout } from '@components/layouts/dashboardLayout/DashboardLayout';
import { GenericLayout } from '@components/layouts/genericLayout/GenericLayout';
import { CompleteRegistrationPage } from '@components/pages/completeRegistration/CompleteRegistrationPage';
import { HistoryPage } from '@components/pages/history/HistoryPage';
import { LoginPage } from '@components/pages/login/LoginPage';
import { MainPage } from '@components/pages/main/MainPage';
import { MoneyStoragePage } from '@components/pages/moneyStorage/MoneyStoragePage';

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
