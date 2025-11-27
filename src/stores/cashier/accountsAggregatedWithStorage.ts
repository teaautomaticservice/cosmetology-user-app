import {
  createAccountApi,
  getAccountsAggregatedWithMoneyStoragesApi,
} from '@apiMethods/cashier';
import {
  AccountAggregatedWithStorage,
  CreateAccount,
} from '@typings/api/cashier';
import { storeFactory } from '@utils/storeFactory';

type Store = {
  accountsAggregatedWithStorage: AccountAggregatedWithStorage[];
  count: number;
  isLoading: boolean;
}

const { useStore } = storeFactory<Store>({
  accountsAggregatedWithStorage: [],
  count: 0,
  isLoading: false,
});

export const useAccountsAggregatedWithStorageStore = () => {
  const [state, setState] = useStore();

  const {
    accountsAggregatedWithStorage,
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

  return {
    accountsAggregatedWithStorage,
    accountsAggregatedWithStorageCount: count,
    isLoading,
    updateAccountsAggregatedWithStorage,
    createAccount,
  };
};
