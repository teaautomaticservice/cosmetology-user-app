import { useAccountsParams } from '@components/pages/accounts/useAccountsParams';
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

  const {
    params,
    updateCurrenciesPagination,
    updateAggregatedAccountsPagination,
  } = useAccountsParams({
    currenciesUpdater: updateCurrenciesList,
    aggregatedAccountUpdater: updateAccountsList,
  });

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
    params,
    isAggregated,
    updateAccountsList,
    toggleEditMode,
    updateCurrenciesList,
    disableEditMode,
    deleteCurrencyWithUpdateAccounts,
    setCurrentCurrency,
    updateMoneyStorages,
    updateCurrenciesPagination,
    updateAggregatedAccountsPagination,
    setCurrentAccountWithStore,
    toggleAggregateMode,
    updateAccountsAggregatedWithStorage,
  };
};
