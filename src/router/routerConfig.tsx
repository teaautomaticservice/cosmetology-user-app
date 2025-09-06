import { DashboardLayout } from "@components/layouts/dashboardLayout/DashboardLayout";
import { GenericLayout } from "@components/layouts/genericLayout/GenericLayout";
import { CompleteRegistrationPage } from "@components/pages/completeRegistration/CompleteRegistrationPage";
import { LoginPage } from "@components/pages/login/LoginPage";
import { MySpacePage } from "@components/pages/mySpace/MySpacePage";

import { paths } from "./paths";
import { RouterPage, RouterRoleEnum } from "./types";

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
    roles: [RouterRoleEnum.UNAUTHORIZED, RouterRoleEnum.PENDING]
  }
]

const mySpace: RouterPage[] = [
  {
    path: paths.main,
    Layout: DashboardLayout,
    Component: MySpacePage,
    roles: [RouterRoleEnum.OPERATOR],
  },
]

export const routerConfig: RouterPage[] = [
  ...unauthorized,
  ...service,
  ...mySpace,
]