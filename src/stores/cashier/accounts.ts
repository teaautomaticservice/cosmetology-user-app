import { getAccountsByMoneyStoragesApi } from '@apiMethods/cashier';
import { AccountsByStore } from '@typings/api/cashier';
import { storeFactory } from '@utils/storeFactory';

type Store = {
  accountsByStores: AccountsByStore[];
  isLoading: boolean;
}

const { useStore } = storeFactory<Store>({
  accountsByStores: [],
  isLoading: true,
});

export const useAccountsStore = () => {
  const [state, setState] = useStore();

  const { accountsByStores, isLoading: isAccountsLoading } = state;

  const updateAccountsList = async () => {
    setState({
      isLoading: true,
    });
    try {
      const { data } = await getAccountsByMoneyStoragesApi({
        sort: 'status',
      });
      setState({
        accountsByStores: data,
      });
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  return {
    accountsByStores,
    isAccountsLoading,
    updateAccountsList,
  };
};
