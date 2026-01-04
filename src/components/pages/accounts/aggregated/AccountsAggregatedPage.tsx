import { useEffect } from 'react';
import { AccountsAggregated } from '@components/domain/accounts/aggregated/AccountsAggregated';
import { useAccountsPageStore } from '@stores/pages/accountsPage';

export const AccountsAggregatedPage: React.FC = () => {
  const {
    updateCurrenciesList,
    updateAccountsAggregatedWithStorage,
  } = useAccountsPageStore();

  useEffect(() => {
    updateCurrenciesList();
    updateAccountsAggregatedWithStorage();
  }, []);

  return (
    <AccountsAggregated />
  );
};
