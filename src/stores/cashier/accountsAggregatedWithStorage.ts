import {
  createAccountApi,
  getAccountsAggregatedWithMoneyStoragesApi,
  getObligationAccountsAggregatedWithMoneyStoragesApi,
  updateMultiplyAccountsApi,
} from '@apiMethods/cashier';
import {
  AccountAggregatedWithStorage,
  CreateAccount,
  GetAccountsAggregatedWithMoneyStoragesListParams,
  UpdateAccountListData,
} from '@typings/api/cashier';
import { storeFactory } from '@utils/storeFactory';

type Store = {
  accountsAggregatedWithStorage: AccountAggregatedWithStorage[];
  obligationAccountsAggregatedWithStorage: AccountAggregatedWithStorage[];
  currentAggregatedAccount: AccountAggregatedWithStorage | null;
  count: number;
  isLoading: boolean;
}

const { useStore } = storeFactory<Store>({
  accountsAggregatedWithStorage: [],
  obligationAccountsAggregatedWithStorage: [],
  currentAggregatedAccount: null,
  count: 0,
  isLoading: false,
});

export const useAccountsAggregatedWithStorageStore = () => {
  const [state, setState] = useStore();

  const {
    accountsAggregatedWithStorage,
    obligationAccountsAggregatedWithStorage,
    currentAggregatedAccount,
    count,
    isLoading,
  } = state;

  const updateAccountsAggregatedWithStorage = async (
    params: GetAccountsAggregatedWithMoneyStoragesListParams = {},
  ) => {
    setState({
      isLoading: true,
    });
    try {
      const {
        data,
        meta,
      } = await getAccountsAggregatedWithMoneyStoragesApi({
        sort: 'status',
        ...params,
      });
      setState({
        accountsAggregatedWithStorage: data,
        count: meta.count,
      });
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  const updateObligationAccountsAggregatedWithStorage = async (
    params: GetAccountsAggregatedWithMoneyStoragesListParams = {},
  ) => {
    setState({
      isLoading: true,
    });
    try {
      const {
        data,
        meta,
      } = await getObligationAccountsAggregatedWithMoneyStoragesApi({
        sort: 'status',
        ...params,
      });
      setState({
        obligationAccountsAggregatedWithStorage: data,
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
    obligationAccountsAggregatedWithStorage,
    updateAccountsAggregatedWithStorage,
    updateObligationAccountsAggregatedWithStorage,
    createAccount,
    setCurrentAggregatedAccount,
    multiplyUpdateAccounts,
  };
};
