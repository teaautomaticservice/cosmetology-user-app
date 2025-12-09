import { useEffect } from 'react';
import { Transactions } from '@components/domain/transactions/Transactions';
import { useTransactionsStore } from '@stores/cashier/transactions';

export const TransactionsPage: React.FC = () => {
  const { updateTransactionsList } = useTransactionsStore();

  useEffect(() => {
    updateTransactionsList();
  }, []);

  return (
    <Transactions />
  );
};
