import {
  createAccountApi,
  getAccountsByMoneyStoragesApi,
  getAccountsWithMoneyStoragesApi,
} from '@apiMethods/cashier';
import {
  AccountsByStore,
  AccountWithStore,
  CreateAccount,
  GetAccountsControllerListParams,
} from '@typings/api/cashier';
import { storeFactory } from '@utils/storeFactory';

type Store = {
  accountsByStores: AccountsByStore[];
  accountsByStoresCount: number;
  accountsWithStores: AccountWithStore[];
  currentAccountWithStore: AccountWithStore | null;
  accountsWithStoresCount: number;
  isLoading: boolean;
}

const { useStore } = storeFactory<Store>({
  accountsByStores: [],
  accountsByStoresCount: 0,
  accountsWithStores: [],
  currentAccountWithStore: null,
  accountsWithStoresCount: 0,
  isLoading: true,
});

export const useAccountsStore = () => {
  const [state, setState] = useStore();

  const {
    accountsByStores,
    accountsWithStores,
    accountsByStoresCount,
    accountsWithStoresCount,
    currentAccountWithStore,
    isLoading: isAccountsLoading,
  } = state;

  const updateAccountsList = async (params: GetAccountsControllerListParams = {}) => {
    setState({
      isLoading: true,
    });
    try {
      const [
        accountsByStoresResp,
        accountsWithStoresResp,
      ] = await Promise.all([
        getAccountsByMoneyStoragesApi({
          sort: 'status',
        }),
        getAccountsWithMoneyStoragesApi(params)
      ]);
      setState({
        accountsByStores: accountsByStoresResp.data,
        accountsByStoresCount: accountsByStoresResp.meta.count,
        accountsWithStores: accountsWithStoresResp.data,
        accountsWithStoresCount: accountsWithStoresResp.meta.count,
      });
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  const createAccount = async (newData: CreateAccount) => {
    setState({
      isLoading: true,
    });
    try {
      await createAccountApi(newData);
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  const setCurrentAccountWithStore = (account: AccountWithStore | null) => {
    setState({
      currentAccountWithStore: account,
    });
  };

  return {
    accountsByStores,
    accountsWithStores,
    isAccountsLoading,
    accountsByStoresCount,
    accountsWithStoresCount,
    currentAccountWithStore,
    updateAccountsList,
    createAccount,
    setCurrentAccountWithStore,
  };
};
