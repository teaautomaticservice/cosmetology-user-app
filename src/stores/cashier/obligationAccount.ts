import { createObligationAccountApi, getObligationAccountsApi } from '@apiMethods/cashier';
import { CreateMoneyStorageData, MoneyStorage } from '@typings/api/cashier';
import { storeFactory } from '@utils/storeFactory';

type Store = {
  obligationAccountsStorages: MoneyStorage[] | null;
  currentObligationStorage: MoneyStorage | null;
  isLoading: boolean;
}

const { useStore } = storeFactory<Store>({
  obligationAccountsStorages: null,
  currentObligationStorage: null,
  isLoading: true,
});

export const useObligationAccountStore = () => {
  const [state, setState] = useStore();

  const {
    obligationAccountsStorages,
    isLoading: isObligationAccountLoading,
    currentObligationStorage,
  } = state;

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

  const setCurrentObligationStorage = async (currentObligationStorage: MoneyStorage | null) => {
    setState({
      currentObligationStorage,
    });
  };

  return {
    obligationAccountsStorages,
    isObligationAccountLoading,
    currentObligationStorage,
    updateObligationAccountsList,
    createObligationAccount,
    setCurrentObligationStorage,
  };
};
