import cn from "classnames";

import { PropsWithChildren } from "react";
import { Footer } from "@components/domain/footer/Footer";
import { Header } from "@components/domain/header/Header";

import { GenericLayout } from "../genericLayout/GenericLayout";

import s from './authorizedLayout.module.css';

type Props = PropsWithChildren<{
  className?: string;
}>;

export const AuthorizedLayout: React.FC<Props> = ({ children }) => {
  return (
    <GenericLayout className={cn(s.root)}>
      <div className={s.mainWrapper}>
        <Header />
        <main className={s.content}>
          {children}
        </main>
      </div>
      <Footer />
    </GenericLayout>
  );
}