import { useEffect } from 'react';
import { Transactions } from '@components/domain/transactions/Transactions';
import { useMoneyStoragesStore } from '@stores/cashier/moneyStorages';
import { useObligationAccountStore } from '@stores/cashier/obligationAccount';
import { useTransactionsStore } from '@stores/cashier/transactions';
import { debounce } from 'lodash';

import { useTransactionsParams } from './useTransactionsParams';

export const TransactionsPage: React.FC = () => {
  const { updateTransactionsList } = useTransactionsStore();
  const { updateAllMoneyStorages } = useMoneyStoragesStore();
  const { updateObligationAccountsList } = useObligationAccountStore();

  const {
    params,
    isReady,
  } = useTransactionsParams();

  const {
    page,
    pageSize,
    amountFrom,
    amountTo,
    anyAccountIds,
    creditIds,
    debitIds,
    ids,
    status,
  } = params;

  const updateAccountListWithParams = debounce(() => {
    if (isReady) {
      updateTransactionsList({
        ...(page && { page: Number(page) }),
        ...(pageSize && { pageSize: Number(pageSize) }),
        ...(amountFrom && { balanceFrom: Number(amountFrom) }),
        ...(amountTo && { balanceFrom: Number(amountTo) }),
        status,
        ...(anyAccountIds && { anyAccountIds: anyAccountIds.map(Number) }),
        ...(creditIds && { creditIds: creditIds.map(Number) }),
        ...(debitIds && { debitIds: debitIds.map(Number) }),
        ...(ids && { ids: ids.map(Number) }),
      });
    }
  }, 100);

  useEffect(() => {
    updateAccountListWithParams();
    updateAllMoneyStorages();
    updateObligationAccountsList();
  }, []);

  useEffect(() => {
    updateAccountListWithParams();
  }, [params]);

  return (
    <Transactions />
  );
};
