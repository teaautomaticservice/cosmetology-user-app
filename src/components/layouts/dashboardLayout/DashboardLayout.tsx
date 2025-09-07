import { Navbar } from "@components/domain/dashboard/navbar/Navbar";
import { Footer } from "@components/domain/footer/Footer";
import { Header } from "@components/domain/header/Header";

import { GenericLayout } from "../genericLayout/GenericLayout";

import s from './dashboardLayout.module.css';

export type Props = React.PropsWithChildren<{}>;

export const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <GenericLayout className={s.root}>
      <div className={s.mainWrapper}>
        <Header />
        <main className={s.contentWrapper}>
          <Navbar />
          <div className={s.content}>{ children }</div>
        </main>
      </div>
      <Footer />
    </GenericLayout>
  )
}