import {
  createCashOutApi,
  createLentApi,
  createLentRepaymentApi,
  createLoanApi,
  createLoanRepaymentApi,
  createOpenBalanceApi,
  createOpenBalanceObligationApi,
  createReceiptApi,
  createRefundInApi,
  createRefundOutApi,
  createTransferApi,
  getTransactionsListApi
} from '@apiMethods/cashier';
import {
  NewLent,
  NewLentRepayment,
  NewLoan,
  NewLoanRepayment,
  NewOpenBalanceObligation,
  NewRefundInApi,
  NewRefundOutApi,
  NewTransaction,
  NewTransfer,
  Transaction,
  TransactionsControllerGetListParams
} from '@typings/api/cashier';
import { storeFactory } from '@utils/storeFactory';

type Store = {
  transactions: Transaction[];
  currentTransactions: Transaction | null;
  count: number;
  isLoading: boolean;
};

const { useStore } = storeFactory<Store>({
  transactions: [],
  currentTransactions: null,
  count: 0,
  isLoading: true,
});

export const useTransactionsStore = () => {
  const [state, setState] = useStore();

  const {
    transactions,
    currentTransactions,
    isLoading,
    count,
  } = state;

  const withLoader = async (handler: () => Promise<void>) => {
    setState({
      isLoading: true,
    });
    try {
      await handler();
    } finally {
      setState((state) => ({
        ...state,
        isLoading: false,
      }));
    }
  };

  const setCurrentTransaction = (currentTransactions: Transaction | null) => {
    setState({
      currentTransactions,
    });
  };

  const updateTransactionsList = async (params: TransactionsControllerGetListParams = {}) =>
    withLoader(async () => {
      const {
        data,
        meta,
      } = await getTransactionsListApi(params);
      setState({
        transactions: data,
        count: meta.count,
      });
    });

  const createOpenBalance = async (data: NewTransaction) =>
    withLoader(async () => {
      await createOpenBalanceApi(data);
    });

  const createOpenBalanceObligation = async (data: NewOpenBalanceObligation) =>
    withLoader(async () => {
      await createOpenBalanceObligationApi(data);
    });

  const createCashOut = async (data: NewTransaction) =>
    withLoader(async () => {
      await createCashOutApi(data);
    });

  const createLoan = async (data: NewLoan) =>
    withLoader(async () => {
      setState({
        isLoading: true,
      });
      await createLoanApi(data);
    });

  const createLoanRepayment = async (data: NewLoanRepayment) =>
    withLoader(async () => {
      await createLoanRepaymentApi(data);
    });

  const createLent = async (data: NewLent) =>
    withLoader(async () => {
      await createLentApi(data);
    });

  const createLentRepayment = async (data: NewLentRepayment) =>
    withLoader(async () => {
      await createLentRepaymentApi(data);
    });

  const createReceipt = async (data: NewTransaction) =>
    withLoader(async () => {
      await createReceiptApi(data);
    });

  const createTransfer = async (data: NewTransfer) =>
    withLoader(async () => {
      await createTransferApi(data);
    });

  const createRefundIn = async (data: NewRefundInApi) =>
    withLoader(async () => {
      await createRefundInApi(data);
    });

  const createRefundOut = async (data: NewRefundOutApi) =>
    withLoader(async () => {
      await createRefundOutApi(data);
    });

  return {
    transactions,
    currentTransactions,
    isLoading,
    count,
    setCurrentTransaction,
    updateTransactionsList,
    createOpenBalance,
    createCashOut,
    createOpenBalanceObligation,
    createLoan,
    createLoanRepayment,
    createLent,
    createLentRepayment,
    createReceipt,
    createTransfer,
    createRefundIn,
    createRefundOut,
  };
};
