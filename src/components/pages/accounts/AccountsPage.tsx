import { useEffect } from 'react';
import { Accounts } from '@components/domain/accounts/Accounts';
import { useAccountsPageStore } from '@stores/pages/accountsPage';

export const AccountsPage: React.FC = () => {
  const {
    updateCurrenciesList,
    disableEditMode,
    updateAllAccounts,
    updateMoneyStorages,
  } = useAccountsPageStore();

  useEffect(() => {
    updateCurrenciesList();
    updateAllAccounts();
    updateMoneyStorages();

    return () => {
      disableEditMode();
    };
  }, []);

  return (
    <Accounts />
  );
};
