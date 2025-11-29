import {
  createAccountApi,
  getAccountsAggregatedWithMoneyStoragesApi,
  updateMultiplyAccountsApi,
} from '@apiMethods/cashier';
import {
  AccountAggregatedWithStorage,
  CreateAccount,
  UpdateAccountListData,
} from '@typings/api/cashier';
import { storeFactory } from '@utils/storeFactory';

type Store = {
  accountsAggregatedWithStorage: AccountAggregatedWithStorage[];
  currentAggregatedAccount: AccountAggregatedWithStorage | null;
  count: number;
  isLoading: boolean;
}

const { useStore } = storeFactory<Store>({
  accountsAggregatedWithStorage: [],
  currentAggregatedAccount: null,
  count: 0,
  isLoading: false,
});

export const useAccountsAggregatedWithStorageStore = () => {
  const [state, setState] = useStore();

  const {
    accountsAggregatedWithStorage,
    currentAggregatedAccount,
    count,
    isLoading,
  } = state;

  const updateAccountsAggregatedWithStorage = async () => {
    setState({
      isLoading: true,
    });
    try {
      const {
        data: accountsAggregatedWithStorage,
        meta,
      } = await getAccountsAggregatedWithMoneyStoragesApi({
        sort: 'status',
      });
      setState({
        accountsAggregatedWithStorage: accountsAggregatedWithStorage,
        count: meta.count,
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

  const multiplyUpdateAccounts = async (newData: UpdateAccountListData) => {
    setState({
      isLoading: true,
    });
    try {
      await updateMultiplyAccountsApi(newData);
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  const setCurrentAggregatedAccount = (account: AccountAggregatedWithStorage | null) => {
    setState({
      currentAggregatedAccount: account,
    });
  };

  return {
    accountsAggregatedWithStorage,
    accountsAggregatedWithStorageCount: count,
    isLoading,
    currentAggregatedAccount,
    updateAccountsAggregatedWithStorage,
    createAccount,
    setCurrentAggregatedAccount,
    multiplyUpdateAccounts,
  };
};
