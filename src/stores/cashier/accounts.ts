import { createAccountApi, getAccountsByMoneyStoragesApi, getAccountsWithMoneyStoragesApi } from '@apiMethods/cashier';
import { AccountsByStore, AccountWithStore, CreateAccount } from '@typings/api/cashier';
import { storeFactory } from '@utils/storeFactory';

type Store = {
  accountsByStores: AccountsByStore[];
  accountsWithStores: AccountWithStore[];
  isLoading: boolean;
}

const { useStore } = storeFactory<Store>({
  accountsByStores: [],
  accountsWithStores: [],
  isLoading: true,
});

export const useAccountsStore = () => {
  const [state, setState] = useStore();

  const {
    accountsByStores,
    accountsWithStores,
    isLoading: isAccountsLoading,
  } = state;

  const updateAccountsList = async () => {
    setState({
      isLoading: true,
    });
    try {
      const [
        { data: accountsByStores },
        { data: accountsWithStores },
      ] = await Promise.all([
        getAccountsByMoneyStoragesApi({
          sort: 'status',
        }),
        getAccountsWithMoneyStoragesApi()
      ]);
      setState({
        accountsByStores,
        accountsWithStores,
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
    accountsByStores,
    accountsWithStores,
    isAccountsLoading,
    updateAccountsList,
    createAccount,
  };
};
