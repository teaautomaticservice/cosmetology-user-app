import { useEffect } from 'react';
import { Accounts } from '@components/domain/accounts/Accounts';
import { useAccountsPageStore } from '@stores/pages/accountsPage';
import { debounce } from 'lodash';

import { useAccountsParams } from './useAccountsParams';

export const AccountsPage: React.FC = () => {
  const {
    updateCurrenciesList,
    disableEditMode,
    updateAccountsAggregatedWithStorage,
    updateMoneyStorages,
    updateAccountsList,
  } = useAccountsPageStore();

  const {
    params,
    isReady,
  } = useAccountsParams();

  const {
    accountsMoneyStoragesIds,
    accountsPage,
    accountsPageSize,
  } = params;

  const updateAccountListWithParams = debounce(() => {
    if (isReady) {
      updateAccountsList({
        moneyStoragesIds: accountsMoneyStoragesIds,
        ...(accountsPage && { page: Number(accountsPage) }),
        ...(accountsPageSize && { pageSize: Number(accountsPageSize) }),
      });
    }
  }, 100);

  useEffect(() => {
    updateCurrenciesList();
    updateAccountListWithParams();
    updateAccountsAggregatedWithStorage();
    updateMoneyStorages();

    return () => {
      disableEditMode();
    };
  }, []);

  useEffect(() => {
    updateAccountListWithParams();
  }, [params]);

  return (
    <Accounts />
  );
};
