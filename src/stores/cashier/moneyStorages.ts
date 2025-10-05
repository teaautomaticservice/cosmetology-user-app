import { getMoneyStoragesApi } from '@apiMethods/cashier';
import { MoneyStorageDto } from '@typings/api/generated';
import { storeFactory } from "@utils/storeFactory";

type Store = {
  moneyStorages: MoneyStorageDto[];
  isLoading: boolean;
}

const { useStore } = storeFactory<Store>({
  moneyStorages: [],
  isLoading: true,
});

export const useMoneyStoragesStore = () => {
  const [state, setState] = useStore();

  const { moneyStorages, isLoading: isMoneyStoragesLoading } = state;

  const updateMoneyStoragesList = async () => {
    setState({
      isLoading: true,
    })
    try {
      const { data } = await getMoneyStoragesApi();
      setState({
        moneyStorages: data,
      })
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }))
    }
  }

  return {
    moneyStorages,
    isMoneyStoragesLoading,
    updateMoneyStoragesList,
  };
};
