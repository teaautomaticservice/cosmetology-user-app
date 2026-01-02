import { useAccountsAggregatedWithStorageStore } from '@stores/cashier/accountsAggregatedWithStorage';

import { useCurrenciesStore } from '../cashier/currencies';
import { useMoneyStoragesStore } from '../cashier/moneyStorages';
import { useObligationAccountStore } from '../cashier/obligationAccount';

export const useMySpacePageStore = () => {
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
    obligationAccountsStorages,
    isObligationAccountLoading,
    updateObligationAccountsList: updateObligationAccountList,
  } = useObligationAccountStore();

  const {
    accountsAggregatedWithStorage,
    isLoading: isAccountsAggregatedWithStorageLoading,
    updateAccountsAggregatedWithStorage,
  } = useAccountsAggregatedWithStorageStore();

  const isLoading = isCurrenciesLoading ||
    isMoneyStoragesLoading ||
    isObligationAccountLoading ||
    isAccountsAggregatedWithStorageLoading;

  const updateData = async () => {
    await Promise.all([
      updateCurrenciesList(),
      updateMoneyStoragesList(),
      updateObligationAccountList(),
      updateAccountsAggregatedWithStorage(),
    ]);
  };

  return {
    isLoading,
    currencies,
    moneyStorages,
    obligationAccountsStorages,
    accountsAggregatedWithStorage,
    updateData,
  };
};
