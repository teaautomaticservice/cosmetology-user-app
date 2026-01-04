import Title from 'antd/es/typography/Title';

import { AccountsActions } from './accountsActions/AccountsActions';
import { AccountsWithStorageList } from './accountsWithStorageList/AccountsWithStorageList';

import s from './accounts.module.css';

export const Accounts: React.FC = () => {
  return (
    <div className={s.root}>
      <Title>Accounts</Title>
      <AccountsActions className={s.actions} />
      <AccountsWithStorageList />
    </div>
  );
};
