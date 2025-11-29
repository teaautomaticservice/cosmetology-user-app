import { useAccountsPageStore } from '@stores/pages/accountsPage';
import Title from 'antd/es/typography/Title';

import { AccountsActions } from './accountsActions/AccountsActions';
import {
  AccountsAggregatedWithStorageList
} from './accountsAggregatedWithStorageList/AccountsAggregatedWithStorageList';
import { AccountsByStorageRow } from './accountsByStorageRow/AccountsByStorageRow';
import { AccountsWithStorageList } from './accountsWithStorageList/AccountsWithStorageList';
import { CurrenciesActions } from './currenciesActions/CurrenciesActions';
import { CurrenciesList } from './currenciesList/CurrenciesList';

import s from './accounts.module.css';

export const Accounts: React.FC = () => {
  const { isEditMode, isAggregated } = useAccountsPageStore();

  const getAccountList = () => {
    if (!isEditMode) {
      return <AccountsByStorageRow />;
    }

    if (isAggregated) {
      return <AccountsAggregatedWithStorageList isExtended />;
    }

    return <AccountsWithStorageList />;
  };

  return (
    <div className={s.root}>
      <Title>Accounts</Title>
      <AccountsActions className={s.actions} />
      {getAccountList()}
      <Title>Currencies</Title>
      <CurrenciesActions className={s.actions} />
      <CurrenciesList />
    </div>
  );
};
