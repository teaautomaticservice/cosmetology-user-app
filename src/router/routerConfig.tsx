import { DashboardLayout } from "@components/layouts/dashboardLayout/DashboardLayout";
import { GenericLayout } from "@components/layouts/genericLayout/GenericLayout";
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
  ...mySpace,
]