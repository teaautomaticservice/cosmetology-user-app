import { Navbar } from "@components/domain/dashboard/navbar/Navbar";
import { Footer } from "@components/domain/footer/Footer";
import { Header } from "@components/domain/header/Header";

import { GenericLayout } from "../genericLayout/GenericLayout";

import s from './dashboardLayout.module.css';
import { AuthorizedLayout } from "../authorizedLayout/AuthorizedLayout";

export type Props = React.PropsWithChildren<{}>;

export const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <AuthorizedLayout className={s.root}>
      <Navbar />
      <div className={s.content}>{children}</div>
    </AuthorizedLayout>
  )
}