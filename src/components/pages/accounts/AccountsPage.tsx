import { useEffect } from 'react';
import { Accounts } from '@components/domain/accounts/Accounts';
import { useAccountsPageStore } from '@stores/pages/accountsPage';
import { CashierService } from '@typings/api/generated';

export const AccountsPage: React.FC = () => {
  const {
    updateCurrenciesList,
    disableEditMode,
    updateAllAccounts,
  } = useAccountsPageStore();

  useEffect(() => {
    updateCurrenciesList();
    updateAllAccounts();
    CashierService.transactionsControllerGetList({});

    return () => {
      disableEditMode();
    };
  }, []);

  return (
    <Accounts />
  );
};
