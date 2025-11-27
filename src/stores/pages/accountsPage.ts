import { useAccountsParams } from '@components/pages/accounts/useAccountsParams';
import { useAccountsStore } from '@stores/cashier/accounts';
import { useAccountsAggregatedWithStorageStore } from '@stores/cashier/accountsAggregatedWithStorage';
import { useCurrenciesStore } from '@stores/cashier/currencies';
import { ID } from '@typings/common';
import { storeFactory } from '@utils/storeFactory';

import { useMoneyStoragesPageStore } from './moneyStoragesPage';

type Store = {
  isEditMode: boolean;
};

const {
  useStore,
} = storeFactory<Store>({
  isEditMode: false,
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
  } = useAccountsAggregatedWithStorageStore();

  const { isEditMode } = state;

  const isAccountsPageLoading =
    isAccountsLoading ||
    isCurrenciesLoading ||
    isAccountsAggregatedLoading;

  const toggleEditMode = () => {
    updateState(({ isEditMode }) => ({ isEditMode: !isEditMode }));
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
  };
};
