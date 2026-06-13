import { useEffect } from 'react';
import { Accounts } from '@components/domain/accounts/Accounts';
import { useAccountsPageStore } from '@stores/pages/accountsPage';
import { debounce } from 'lodash';

import { useAccountsParams } from './useAccountsParams';

export const AccountsPage: React.FC = () => {
  const {
    updateCurrenciesList,
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
    page,
    pageSize,
    status,
    query,
    balanceFrom,
    balanceTo,
  } = params;

  const updateAccountListWithParams = debounce(() => {
    if (isReady) {
      updateAccountsList({
        moneyStoragesIds: accountsMoneyStoragesIds?.map(Number),
        ...(page && { page: Number(page) }),
        ...(pageSize && { pageSize: Number(pageSize) }),
        status,
        query,
        ...(balanceFrom && { balanceFrom: Number(balanceFrom) }),
        ...(balanceTo && { balanceTo: Number(balanceTo) }),
      });
    }
  }, 100);

  useEffect(() => {
    updateCurrenciesList();
    updateAccountListWithParams();
    updateAccountsAggregatedWithStorage();
    updateMoneyStorages();
  }, []);

  useEffect(() => {
    updateAccountListWithParams();
  }, [params]);

  return (
    <Accounts />
  );
};
