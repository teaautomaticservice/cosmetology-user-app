import { useCurrenciesStore } from '@stores/cashier/currencies';
import { useTransactionsStore } from '@stores/cashier/transactions';
import { useModalStore } from '@stores/modal';
import { useUpdateMoneyStorageStore } from '@stores/updateMoneyStorage';
import { MoneyStorage } from '@typings/api/cashier';

import { useMoneyStoragesStore } from '../cashier/moneyStorages';
import { useObligationAccountStore } from '../cashier/obligationAccount';

export const useMoneyStoragesPageStore = () => {
  const {
    moneyStorages,
    isMoneyStoragesLoading,
    updateMoneyStoragesList,
  } = useMoneyStoragesStore();

  const {
    obligationAccountsStorages,
    isObligationAccountLoading,
    updateObligationAccountsList,
  } = useObligationAccountStore();

  const {
    updateTransactionsList,
  } = useTransactionsStore();

  const {
    updateCurrenciesList,
  } = useCurrenciesStore();

  const { open } = useModalStore();
  const { setCurrentMoneyStorage } = useUpdateMoneyStorageStore();

  const isLoading = isMoneyStoragesLoading ||
    isObligationAccountLoading;

  const updateMoneyStorages = async () => {
    await Promise.all([
      updateMoneyStoragesList(),
      updateObligationAccountsList(),
    ]);
  };

  const openUpdateModal = (currentMoneyStorage: MoneyStorage) => {
    open('actionsMoneyStorage');
    setCurrentMoneyStorage(currentMoneyStorage);
  };

  return {
    isLoading,
    moneyStorages,
    obligationAccountsStorages,
    updateTransactionsList,
    updateMoneyStorages,
    openUpdateModal,
    updateCurrenciesList,
  };
};
