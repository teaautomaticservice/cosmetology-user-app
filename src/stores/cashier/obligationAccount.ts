import { getObligationAccount } from '@apiMethods/cashier';
import { MoneyStorageDto } from '@typings/api/generated';
import { storeFactory } from "@utils/storeFactory";

type Store = {
  obligationAccountStorages: MoneyStorageDto | null;
  isLoading: boolean;
}

const { useStore } = storeFactory<Store>({
  obligationAccountStorages: null,
  isLoading: true,
});

export const useObligationAccountStore = () => {
  const [state, setState] = useStore();

  const { obligationAccountStorages, isLoading: isObligationAccountLoading } = state;

  const updateObligationAccountList = async () => {
    setState({
      isLoading: true,
    })
    try {
      const data = await getObligationAccount();
      setState({
        obligationAccountStorages: data,
      })
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }))
    }
  }

  return {
    obligationAccountStorages,
    isObligationAccountLoading,
    updateObligationAccountList,
  };
};
