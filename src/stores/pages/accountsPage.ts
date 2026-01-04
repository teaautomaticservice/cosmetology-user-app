import { useAccountsStore } from '@stores/cashier/accounts';
import { useAccountsAggregatedWithStorageStore } from '@stores/cashier/accountsAggregatedWithStorage';
import { useCurrenciesStore } from '@stores/cashier/currencies';
import { ID } from '@typings/common';

import { useMoneyStoragesPageStore } from './moneyStoragesPage';;

export const useAccountsPageStore = () => {
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

  const isAccountsPageLoading =
    isAccountsLoading ||
    isCurrenciesLoading ||
    isAccountsAggregatedLoading;

  const deleteCurrencyWithUpdateAccounts = async (currentId: ID) => {
    await deleteCurrency(currentId);
    updateAccountsList();
  };

  return {
    accountsByStores,
    accountsWithStores,
    isAccountsPageLoading,
    currencies,
    currenciesCount,
    accountsAggregatedWithStorage,
    accountsAggregatedWithStorageCount,
    accountsByStoresCount,
    accountsWithStoresCount,
    moneyStorages,
    updateAccountsList,
    updateCurrenciesList,
    deleteCurrencyWithUpdateAccounts,
    setCurrentCurrency,
    updateMoneyStorages,
    setCurrentAccountWithStore,
    updateAccountsAggregatedWithStorage,
  };
};
