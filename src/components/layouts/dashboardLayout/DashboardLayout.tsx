import { Navbar } from '@components/domain/dashboard/navbar/Navbar';

import { AuthorizedLayout } from '../authorizedLayout/AuthorizedLayout';

import s from './dashboardLayout.module.css';

export type Props = React.PropsWithChildren<{}>;

export const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <AuthorizedLayout className={s.root}>
      <Navbar className={s.navBar} />
      <div className={s.content}>{children}</div>
    </AuthorizedLayout>
  );
};
