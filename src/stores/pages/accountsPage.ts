import { useAccountsStore } from '@stores/cashier/accounts';
import { useAccountsAggregatedWithStorageStore } from '@stores/cashier/accountsAggregatedWithStorage';
import { useCurrenciesStore } from '@stores/cashier/currencies';
import { ID } from '@typings/common';
import { storeFactory } from '@utils/storeFactory';

import { useMoneyStoragesPageStore } from './moneyStoragesPage';

type Store = {
  isEditMode: boolean;
  isAggregated: boolean;
};

const {
  useStore,
} = storeFactory<Store>({
  isEditMode: false,
  isAggregated: false,
});

export const useAccountsPageStore = () => {
  const [state, updateState] = useStore();
  const {
    accountsByStores,
    accountsWithStores,
    isAccountsLoading,
    accountsByStoresCount,
    accountsWithStoresCount,
    updateAccountsList,
    setCurrentAccountWithStore,
  } = useAccountsStore();
  const {
    currencies,
    isCurrenciesLoading,
    currenciesCount,
    updateCurrenciesList,
    deleteCurrency,
    setCurrentCurrency,
  } = useCurrenciesStore();
  const {
    moneyStorages,
    updateMoneyStorages,
  } = useMoneyStoragesPageStore();
  const {
    accountsAggregatedWithStorage,
    isLoading: isAccountsAggregatedLoading,
    accountsAggregatedWithStorageCount,
    updateAccountsAggregatedWithStorage,
  } = useAccountsAggregatedWithStorageStore();

  const { isEditMode, isAggregated } = state;

  const isAccountsPageLoading =
    isAccountsLoading ||
    isCurrenciesLoading ||
    isAccountsAggregatedLoading;

  const toggleEditMode = () => {
    updateState((state) => ({
      ...state,
      isEditMode: !state.isEditMode,
    }));
  };

  const toggleAggregateMode = () => {
    updateState((state) => ({
      ...state,
      isAggregated: !state.isAggregated,
    }));
  };

  const disableEditMode = () => {
    updateState({
      isEditMode: false,
    });
  };

  const deleteCurrencyWithUpdateAccounts = async (currentId: ID) => {
    await deleteCurrency(currentId);
    updateAccountsList();
  };

  return {
    isEditMode,
    accountsByStores,
    accountsWithStores,
    isAccountsPageLoading,
    currencies,
    currenciesCount,
    accountsAggregatedWithStorage,
    accountsAggregatedWithStorageCount,
    accountsByStoresCount,
    accountsWithStoresCount,
    isAggregated,
    moneyStorages,
    updateAccountsList,
    toggleEditMode,
    updateCurrenciesList,
    disableEditMode,
    deleteCurrencyWithUpdateAccounts,
    setCurrentCurrency,
    updateMoneyStorages,
    setCurrentAccountWithStore,
    toggleAggregateMode,
    updateAccountsAggregatedWithStorage,
  };
};
