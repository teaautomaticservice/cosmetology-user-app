import { useEffect } from 'react';
import { Transactions } from '@components/domain/transactions/Transactions';
import { useMoneyStoragesStore } from '@stores/cashier/moneyStorages';
import { useObligationAccountStore } from '@stores/cashier/obligationAccount';
import { useTransactionsStore } from '@stores/cashier/transactions';
import { TransactionsControllerGetListParams } from '@typings/api/cashier';
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
    status,
    anyId,
    query,
    operationTypes,
  } = params;

  const updateAccountListWithParams = debounce(() => {
    if (isReady) {
      updateTransactionsList({
        page: page ? Number(page) : undefined,
        pageSize: pageSize ? Number(pageSize) : undefined,
        status,
        amountFrom: amountFrom ? Number(amountFrom) : undefined,
        amountTo: amountTo ? Number(amountTo) : undefined,
        anyAccountIds: anyAccountIds ? anyAccountIds.map(Number) : undefined,
        creditIds: creditIds ? creditIds.map(Number) : undefined,
        debitIds: debitIds ? debitIds.map(Number) : undefined,
        anyId,
        query,
        operationTypes: operationTypes as TransactionsControllerGetListParams['operationTypes'],
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
