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

  const isLoading = isMoneyStoragesLoading ||
    isObligationAccountLoading;

  const updateData = async () => {
    await Promise.all([
      updateMoneyStoragesList(),
      updateObligationAccountList(),
    ]);
  };

  return {
    isLoading,
    moneyStorages,
    obligationAccountStorages,
    updateData,
  };
};
