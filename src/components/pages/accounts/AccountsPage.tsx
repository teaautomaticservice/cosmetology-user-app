import { useEffect } from 'react';
import { Accounts } from '@components/domain/accounts/Accounts';
import { useAccountsStore } from '@stores/cashier/accounts';

export const AccountsPage: React.FC = () => {
  const { updateAccountsList } = useAccountsStore();
  
  useEffect(() => {
    updateAccountsList();
  }, []);

  return (
    <Accounts />
  );
};
