import { getMoneyStoragesApi } from '@apiMethods/cashier';
import { MoneyStorage } from '@typings/api/moneyStorage';
import { storeFactory } from '@utils/storeFactory';

type Store = {
  moneyStorages: MoneyStorage[];
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
    });
    try {
      const { data } = await getMoneyStoragesApi();
      setState({
        moneyStorages: data,
      });
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  return {
    moneyStorages,
    isMoneyStoragesLoading,
    updateMoneyStoragesList,
  };
};
