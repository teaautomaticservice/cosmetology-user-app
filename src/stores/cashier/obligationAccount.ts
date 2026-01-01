import { getObligationAccounts } from '@apiMethods/cashier';
import { MoneyStorage } from '@typings/api/cashier';
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

  const updateObligationAccountList = async () => {
    setState({
      isLoading: true,
    });
    try {
      const {
        data,
      } = await getObligationAccounts();
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

  return {
    obligationAccountsStorages,
    isObligationAccountLoading,
    updateObligationAccountList,
  };
};
