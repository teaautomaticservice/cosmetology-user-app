import { useEffect } from 'react';
import { Transactions } from '@components/domain/transactions/Transactions';
import { useTransactionsStore } from '@stores/cashier/transactions';

import { useTransactionsParams } from './useTransactionsParams';

export const TransactionsPage: React.FC = () => {
  const { updateTransactionsList } = useTransactionsStore();

  const {
    params,
  } = useTransactionsParams();

  const {
    page,
    pageSize,
  } = params;

  useEffect(() => {
    updateTransactionsList({
      ...(page && { page: Number(page) }),
      ...(pageSize && { pageSize: Number(pageSize) }),
    });
  }, []);

  return (
    <Transactions />
  );
};
