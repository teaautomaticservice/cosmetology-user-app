import { useAccountsPageStore } from '@stores/pages/accountsPage';
import Title from 'antd/es/typography/Title';

import { AccountsActions } from './accountsActions/AccountsActions';
import { AccountsByStorageRow } from './accountsByStorageRow/AccountsByStorageRow';
import { AccountsList } from './accountsList/AccountsList';
import { CurrenciesActions } from './currenciesActions/CurrenciesActions';
import { CurrenciesList } from './currenciesList/CurrenciesList';

import s from './accounts.module.css';

export const Accounts: React.FC = () => {
  const { isEditMode } = useAccountsPageStore();

  return (
    <div className={s.root}>
      <Title>Accounts</Title>
      <AccountsActions className={s.actions} />
      {isEditMode ? (
        <AccountsList />
      ): (
        <AccountsByStorageRow />
      )}
      <Title>Currencies</Title>
      <CurrenciesActions className={s.actions} />
      <CurrenciesList />
    </div>
  );
};
