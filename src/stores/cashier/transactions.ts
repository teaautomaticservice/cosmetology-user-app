import {
  createCashOutApi,
  createLoanApi,
  createLoanRepaymentApi,
  createOpenBalanceApi,
  createOpenBalanceObligationApi,
  createReceiptApi,
  createTransferApi,
  getTransactionsListApi
} from '@apiMethods/cashier';
import {
  NewLoan,
  NewLoanRepayment,
  NewOpenBalanceObligation,
  NewTransaction,
  NewTransfer,
  Transaction
} from '@typings/api/cashier';
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

  const createOpenBalanceObligation = async (data: NewOpenBalanceObligation) => {
    setState({
      isLoading: true,
    });
    try {
      await createOpenBalanceObligationApi(data);
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

  const createLoan = async (data: NewLoan) => {
    setState({
      isLoading: true,
    });
    try {
      await createLoanApi(data);
    } finally {
      setState({
        isLoading: false,
      });
    }
  };

  const createLoanRepayment = async (data: NewLoanRepayment) => {
    setState({
      isLoading: true,
    });
    try {
      await createLoanRepaymentApi(data);
    } finally {
      setState({
        isLoading: false,
      });
    }
  };

  const createReceipt = async (data: NewTransaction) => {
    setState({
      isLoading: true,
    });
    try {
      await createReceiptApi(data);
    } finally {
      setState({
        isLoading: false,
      });
    }
  };

  const createTransfer = async (data: NewTransfer) => {
    setState({
      isLoading: true,
    });
    try {
      await createTransferApi(data);
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
    createOpenBalanceObligation,
    createLoan,
    createLoanRepayment,
    createReceipt,
    createTransfer,
  };
};
