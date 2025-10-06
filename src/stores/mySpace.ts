import { useCurrenciesStore } from './cashier/currencies';
import { useMoneyStoragesStore } from './cashier/moneyStorages';
import { useObligationAccountStore } from './cashier/obligationAccount';

export const useMySpaceStore = () => {
  const {
    currencies,
    isCurrenciesLoading,
    updateCurrenciesList
  } = useCurrenciesStore();

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

  const isLoading = isCurrenciesLoading ||
    isMoneyStoragesLoading ||
    isObligationAccountLoading;

  const updateData = async () => {
    await Promise.all([
      updateCurrenciesList(),
      updateMoneyStoragesList(),
      updateObligationAccountList(),
    ]);
  };

  return {
    isLoading,
    currencies,
    moneyStorages,
    obligationAccountStorages,
    updateData,
  };
};
