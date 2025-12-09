import { getTransactionsList } from '@apiMethods/cashier';
import { Transaction } from '@typings/api/cashier';
import { storeFactory } from '@utils/storeFactory';

type Store = {
  transactions: Transaction[];
  isLoading: boolean;
};

const { useStore } = storeFactory<Store>({
  transactions: [],
  isLoading: true,
});

export const useTransactionsStore = () => {
  const [state, setState] = useStore();

  const {
    transactions,
    isLoading,
  } = state;

  const updateTransactionsList = async () => {
    setState({
      isLoading: true,
    });
    try {
      const {
        data,
      } = await getTransactionsList();
      setState({
        transactions: data,
      });
    } finally {
      setState((state) => ({
        ...state,
        isLoading: false,
      }));
    }
  };

  return {
    transactions,
    isLoading,
    updateTransactionsList,
  };
};
