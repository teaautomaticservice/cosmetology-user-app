import { LoginPage } from "@components/pages/login/LoginPage";
import { MySpacePage } from "@components/pages/mySpace/MySpacePage";

import { paths } from "./paths";
import { RouterPage, RouterRoleEnum } from "./types";

const unauthorized: RouterPage[] = [
  {
    path: paths.login,
    Component: LoginPage,
    roles: [RouterRoleEnum.UNAUTHORIZED],
  },
];

const mySpace: RouterPage[] = [
  {
    path: paths.main,
    Component: MySpacePage,
    roles: [RouterRoleEnum.OPERATOR],
  },
]

export const routerConfig: RouterPage[] = [
  ...unauthorized,
  ...mySpace,
]