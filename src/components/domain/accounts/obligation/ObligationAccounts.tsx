import Title from 'antd/es/typography/Title';

import { AccountsActions } from '../accountsActions/AccountsActions';

import { ObligationAccountsList } from './list/ObligationAccountsList';

import s from './obligationAccounts.module.css';

export const ObligationAccounts: React.FC = () => {
  return (
    <div className={s.root}>
      <Title>Obligation Accounts</Title>
      <AccountsActions className={s.actions} typeMoneyStorages="obligation" />
      <ObligationAccountsList />
    </div>
  );
};
