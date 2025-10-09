import { getMoneyStoragesApi } from '@apiMethods/cashier';
import { MoneyStorage } from '@typings/api/moneyStorage';
import { storeFactory } from '@utils/storeFactory';

import { useObligationAccountStore } from './obligationAccount';

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
  const { updateObligationAccountList } = useObligationAccountStore();

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

  const updateAllMoneyStorages = () => {
    updateMoneyStoragesList();
    updateObligationAccountList();
  };

  return {
    moneyStorages,
    isMoneyStoragesLoading,
    updateMoneyStoragesList,
    updateAllMoneyStorages,
  };
};
