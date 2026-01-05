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
  Transaction,
  TransactionsControllerGetListParams
} from '@typings/api/cashier';
import { storeFactory } from '@utils/storeFactory';

type Store = {
  transactions: Transaction[];
  count: number;
  isLoading: boolean;
};

const { useStore } = storeFactory<Store>({
  transactions: [],
  count: 0,
  isLoading: true,
});

export const useTransactionsStore = () => {
  const [state, setState] = useStore();

  const {
    transactions,
    isLoading,
    count,
  } = state;

  const updateTransactionsList = async (params: TransactionsControllerGetListParams = {}) => {
    setState({
      isLoading: true,
    });
    try {
      const {
        data,
        meta,
      } = await getTransactionsListApi(params);
      setState({
        transactions: data,
        count: meta.count,
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
    count,
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
