import { useModalStore } from '@stores/modal';
import { useUpdateMoneyStorageStore } from '@stores/updateMoneyStorage';
import { MoneyStorage } from '@typings/api/moneyStorage';

import { useMoneyStoragesStore } from '../cashier/moneyStorages';
import { useObligationAccountStore } from '../cashier/obligationAccount';

export const useMoneyStoragesPageStore = () => {
  const {
    moneyStorages,
    isMoneyStoragesLoading,
    updateMoneyStoragesList,
  } = useMoneyStoragesStore();

  const {
    obligationAccountStorages,
    isObligationAccountLoading,
    updateObligationAccountList,
  } = useObligationAccountStore();

  const { open } = useModalStore();
  const { setCurrentMoneyStorage } = useUpdateMoneyStorageStore();

  const isLoading = isMoneyStoragesLoading ||
    isObligationAccountLoading;

  const updateData = async () => {
    await Promise.all([
      updateMoneyStoragesList(),
      updateObligationAccountList(),
    ]);
  };

  const openUpdateModal = (currentMoneyStorage: MoneyStorage) => {
    open('actionsMoneyStorage');
    setCurrentMoneyStorage(currentMoneyStorage);
  };

  return {
    isLoading,
    moneyStorages,
    obligationAccountStorages,
    updateData,
    openUpdateModal,
  };
};
