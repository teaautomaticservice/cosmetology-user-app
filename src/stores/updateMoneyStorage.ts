import { updateMoneyStorageApi } from '@apiMethods/cashier';
import { MoneyStorage, UpdateMoneyStorageData } from '@typings/api/cashier';
import { storeFactory } from '@utils/storeFactory';

type Store = {
  currentMoneyStorage: MoneyStorage | null;
  isLoading: boolean;
}

const { useStore } = storeFactory<Store>({
  currentMoneyStorage: null,
  isLoading: false,
});

export const useUpdateMoneyStorageStore = () => {
  const [state, setState] = useStore();

  const { currentMoneyStorage, isLoading } = state;

  const updateMoneyStorageData = async (newData: UpdateMoneyStorageData) => {
    if (currentMoneyStorage) {
      setState({
        isLoading: true,
      });
      try {
        const updatedEntity = await updateMoneyStorageApi({
          currentId: currentMoneyStorage.id,
          newData,
        });
        setState({
          currentMoneyStorage: updatedEntity,
        });
      } finally {
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      }
    }
  };

  const setCurrentMoneyStorage = (newData: MoneyStorage | null) => {
    setState({
      currentMoneyStorage: newData,
    });
  };

  return {
    currentMoneyStorage,
    isLoading,
    updateMoneyStorageData,
    setCurrentMoneyStorage,
  };
};
