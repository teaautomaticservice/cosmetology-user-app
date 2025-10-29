import { useAccountsStore } from '@stores/cashier/accounts';
import { useCurrenciesStore } from '@stores/cashier/currencies';
import { ID } from '@typings/common';
import { storeFactory } from '@utils/storeFactory';

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
    updateAccountsList,
  } = useAccountsStore();
  const {
    currencies,
    isCurrenciesLoading,
    updateCurrenciesList,
    deleteCurrency,
  } = useCurrenciesStore();

  const { isEditMode } = state;

  const isAccountsPageLoading = isAccountsLoading || isCurrenciesLoading;

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

  return {
    isEditMode,
    accountsByStores,
    accountsWithStores,
    isAccountsPageLoading,
    currencies,
    updateAccountsList,
    toggleEditMode,
    updateCurrenciesList,
    disableEditMode,
    deleteCurrencyWithUpdateAccounts,
  };
};
