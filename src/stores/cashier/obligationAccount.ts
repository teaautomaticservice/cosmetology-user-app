import { createObligationAccountApi, getObligationAccountsApi } from '@apiMethods/cashier';
import { CreateMoneyStorageData, MoneyStorage } from '@typings/api/cashier';
import { storeFactory } from '@utils/storeFactory';

type Store = {
  obligationAccountsStorages: MoneyStorage[] | null;
  isLoading: boolean;
}

const { useStore } = storeFactory<Store>({
  obligationAccountsStorages: null,
  isLoading: true,
});

export const useObligationAccountStore = () => {
  const [state, setState] = useStore();

  const { obligationAccountsStorages, isLoading: isObligationAccountLoading } = state;

  const updateObligationAccountsList = async () => {
    setState({
      isLoading: true,
    });
    try {
      const {
        data,
      } = await getObligationAccountsApi();
      setState({
        obligationAccountsStorages: data,
      });
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  const createObligationAccount = async (newData: CreateMoneyStorageData) => {
    setState({
      isLoading: true,
    });
    try {
      await createObligationAccountApi(newData);
      await updateObligationAccountsList();
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  return {
    obligationAccountsStorages,
    isObligationAccountLoading,
    updateObligationAccountsList,
    createObligationAccount,
  };
};
