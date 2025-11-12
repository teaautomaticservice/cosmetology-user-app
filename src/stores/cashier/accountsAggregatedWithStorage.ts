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
  isLoading: boolean;
}

const { useStore } = storeFactory<Store>({
  accountsAggregatedWithStorage: [],
  isLoading: true,
});

export const useAccountsAggregatedWithStorageStore = () => {
  const [state, setState] = useStore();

  const {
    accountsAggregatedWithStorage,
    isLoading,
  } = state;

  const updateAccountsAggregatedWithStorage = async () => {
    setState({
      isLoading: true,
    });
    try {
      const {
        data: accountsAggregatedWithStorage,
      } = await getAccountsAggregatedWithMoneyStoragesApi({
        sort: 'status',
      });
      setState({
        accountsAggregatedWithStorage: accountsAggregatedWithStorage,
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
    isLoading,
    updateAccountsAggregatedWithStorage,
    createAccount,
  };
};
