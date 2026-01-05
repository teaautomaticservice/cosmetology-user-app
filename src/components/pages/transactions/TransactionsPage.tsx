import { useEffect } from 'react';
import { Transactions } from '@components/domain/transactions/Transactions';
import { useTransactionsStore } from '@stores/cashier/transactions';
import { debounce } from 'lodash';

import { useTransactionsParams } from './useTransactionsParams';

export const TransactionsPage: React.FC = () => {
  const { updateTransactionsList } = useTransactionsStore();

  const {
    params,
    isReady,
  } = useTransactionsParams();

  const {
    page,
    pageSize,
  } = params;

  const updateAccountListWithParams = debounce(() => {
    if (isReady) {
      updateTransactionsList({
        ...(page && { page: Number(page) }),
        ...(pageSize && { pageSize: Number(pageSize) }),
      });
    }
  }, 100);

  useEffect(() => {
    updateAccountListWithParams();
  }, []);

  useEffect(() => {
    updateAccountListWithParams();
  }, [params]);

  return (
    <Transactions />
  );
};
