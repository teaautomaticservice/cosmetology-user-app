import { createCashOutApi, createOpenBalanceApi, getTransactionsListApi } from '@apiMethods/cashier';
import { NewTransaction, Transaction } from '@typings/api/cashier';
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
      } = await getTransactionsListApi();
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

  const createOpenBalance = async (data: NewTransaction) => {
    setState({
      isLoading: true,
    });
    try {
      await createOpenBalanceApi(data);
    } finally {
      setState({
        isLoading: false,
      });
    }
  };

  const createCashOut = async (data: NewTransaction) => {
    setState({
      isLoading: true,
    });
    try {
      await createCashOutApi(data);
    } finally {
      setState({
        isLoading: false,
      });
    }
  };

  return {
    transactions,
    isLoading,
    updateTransactionsList,
    createOpenBalance,
    createCashOut,
  };
};
