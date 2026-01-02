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
    updateObligationAccountsList,
  } = useObligationAccountStore();

  const {
    accountsAggregatedWithStorage,
    obligationAccountsAggregatedWithStorage,
    isLoading: isAccountsAggregatedWithStorageLoading,
    updateAccountsAggregatedWithStorage,
    updateObligationAccountsAggregatedWithStorage,
  } = useAccountsAggregatedWithStorageStore();

  const isLoading = isCurrenciesLoading ||
    isMoneyStoragesLoading ||
    isObligationAccountLoading ||
    isAccountsAggregatedWithStorageLoading;

  const updateData = async () => {
    await Promise.all([
      updateCurrenciesList(),
      updateMoneyStoragesList(),
      updateObligationAccountsList(),
      updateAccountsAggregatedWithStorage({
        balanceFrom: 1,
      }),
      updateObligationAccountsAggregatedWithStorage({
        balanceFrom: 1,
      })
    ]);
  };

  return {
    isLoading,
    currencies,
    moneyStorages,
    obligationAccountsStorages,
    accountsAggregatedWithStorage,
    obligationAccountsAggregatedWithStorage,
    updateData,
  };
};
