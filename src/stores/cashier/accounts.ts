import {
  createAccountApi,
  getAccountsByMoneyStoragesApi,
  getAccountsByObligationStoragesApi,
  getAccountsWithMoneyStoragesApi,
  getAccountsWithObligationStoragesApi,
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
  accountsByObligationStores: AccountsByStore[];
  accountsByStoresCount: number;
  accountsWithStores: AccountWithStore[];
  obligationAccountsWithStores: AccountWithStore[];
  obligationAccountsWithStoresCount: number;
  accountsWithStoresForParams: AccountWithStore[];
  currentAccountWithStore: AccountWithStore | null;
  accountsWithStoresCount: number;
  isLoading: boolean;
}

const { useStore } = storeFactory<Store>({
  accountsByStores: [],
  accountsByStoresCount: 0,
  accountsByObligationStores: [],
  accountsWithStores: [],
  accountsWithStoresCount: 0,
  obligationAccountsWithStores: [],
  obligationAccountsWithStoresCount: 0,
  accountsWithStoresForParams: [],
  currentAccountWithStore: null,
  isLoading: true,
});

export const useAccountsStore = () => {
  const [state, setState] = useStore();

  const {
    accountsByStores,
    accountsWithStores,
    accountsWithStoresForParams,
    accountsByStoresCount,
    accountsWithStoresCount,
    currentAccountWithStore,
    accountsByObligationStores,
    obligationAccountsWithStores,
    obligationAccountsWithStoresCount,
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
        accountsByObligationStoresResp,
        obligationAccountsWithStoresResp,
      ] = await Promise.all([
        getAccountsByMoneyStoragesApi({
          sort: 'status',
        }),
        getAccountsWithMoneyStoragesApi(params),
        getAccountsByObligationStoragesApi({
          sort: 'status',
        }),
        getAccountsWithObligationStoragesApi(params),
      ]);
      setState({
        accountsByStores: accountsByStoresResp.data,
        accountsByObligationStores: accountsByObligationStoresResp.data,
        accountsByStoresCount: accountsByStoresResp.meta.count,
        accountsWithStores: accountsWithStoresResp.data,
        obligationAccountsWithStores: obligationAccountsWithStoresResp.data,
        obligationAccountsWithStoresCount: obligationAccountsWithStoresResp.meta.count,
        accountsWithStoresForParams: accountsWithStoresResp.data,
        accountsWithStoresCount: accountsWithStoresResp.meta.count,
      });
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  const updateAccountsListParams = async (params: GetAccountsControllerListParams = {}) => {
    setState({
      isLoading: true,
    });
    try {
      const {
        data,
      } = await getAccountsWithMoneyStoragesApi(params);
      setState({
        accountsWithStoresForParams: data,
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
    accountsWithStoresForParams,
    isAccountsLoading,
    accountsByStoresCount,
    accountsWithStoresCount,
    currentAccountWithStore,
    accountsByObligationStores,
    obligationAccountsWithStores,
    obligationAccountsWithStoresCount,
    updateAccountsList,
    createAccount,
    setCurrentAccountWithStore,
    updateAccountsListParams,
  };
};
