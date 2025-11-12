import { useEffect } from 'react';
import { Accounts } from '@components/domain/accounts/Accounts';
import { useAccountsPageStore } from '@stores/pages/accountsPage';

export const AccountsPage: React.FC = () => {
  const {
    updateAccountsList,
    updateCurrenciesList,
    disableEditMode,
    updateMoneyStorages,
  } = useAccountsPageStore();

  useEffect(() => {
    updateAccountsList();
    updateCurrenciesList();
    updateMoneyStorages();

    return () => {
      disableEditMode();
    };
  }, []);

  return (
    <Accounts />
  );
};
