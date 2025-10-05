import { PropsWithChildren } from 'react';
import { Footer } from '@components/domain/footer/Footer';
import { Header } from '@components/domain/header/Header';
import cn from 'classnames';

import { GenericLayout } from '../genericLayout/GenericLayout';

import s from './authorizedLayout.module.css';

type Props = PropsWithChildren<{
  className?: string;
}>;

export const AuthorizedLayout: React.FC<Props> = ({ children, className }) => {
  return (
    <GenericLayout className={cn(s.root, className)}>
      <div className={s.mainWrapper}>
        <Header />
        <main className={s.content}>
          {children}
        </main>
      </div>
      <Footer />
    </GenericLayout>
  );
};
