import { useEffect } from 'react';
import { AccountsByStorage } from '@components/domain/accounts/byStorage/AccountsByStorage';
import { useAccountsPageStore } from '@stores/pages/accountsPage';

export const AccountsByStoragePage: React.FC = () => {
  const {
    updateCurrenciesList,
    updateAccountsList,
    updateMoneyStorages,
  } = useAccountsPageStore();

  useEffect(() => {
    updateCurrenciesList();
    updateAccountsList();
    updateMoneyStorages();
  }, []);

  return (
    <AccountsByStorage />
  );
};
