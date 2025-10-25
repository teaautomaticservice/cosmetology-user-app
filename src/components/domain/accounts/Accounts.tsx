import Title from 'antd/es/typography/Title';

import { AccountsActions } from './accountsActions/AccountsActions';
import { AccountsByStorageRow } from './accountsByStorageRow/AccountsByStorageRow';

import s from './accounts.module.css';

export const Accounts: React.FC = () => {
  return (
    <div className={s.root}>
      <Title>Accounts</Title>
      <AccountsActions className={s.actions} />
      <AccountsByStorageRow />
    </div>
  );
};
