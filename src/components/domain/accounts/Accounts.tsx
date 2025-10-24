import Title from 'antd/es/typography/Title';

import { AccountsByStorageRow } from './accountsByStorageRow/AccountsByStorageRow';

import s from './accounts.module.css';

export const Accounts: React.FC = () => {
  return (
    <div className={s.root}>
      <Title>Accounts</Title>
      <AccountsByStorageRow />
    </div>
  );
};
