import { createMoneyStorageApi, getMoneyStoragesApi } from '@apiMethods/cashier';
import {
  CreateMoneyStorageData,
  GetMoneyStorageListSort,
  MoneyStorage,
  MoneyStorageStatusEnum
} from '@typings/api/cashier';
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

const { useStore: useLoadingCreateItemStore } = storeFactory<boolean>(false);

export const useMoneyStoragesStore = () => {
  const [state, setState] = useStore();
  const { updateObligationAccountsList: updateObligationAccountList } = useObligationAccountStore();
  const [isCreateItemLoading, setIsCreateItemLoading] = useLoadingCreateItemStore();

  const { moneyStorages, isLoading: isMoneyStoragesLoading } = state;

  const activeMoneyStorages = moneyStorages
    .filter(({ status }) => status === MoneyStorageStatusEnum.ACTIVE);

  const updateMoneyStoragesList = async ({
    order,
    sort,
  }: GetMoneyStorageListSort = {}) => {
    setState({
      isLoading: true,
    });
    try {
      const { data } = await getMoneyStoragesApi({
        order,
        sort,
      });
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

  const createMoneyStorage = async (newData: CreateMoneyStorageData) => {
    try {
      setIsCreateItemLoading(true);
      await createMoneyStorageApi(newData);
      updateMoneyStoragesList();
    } finally {
      setIsCreateItemLoading(false);
    }
  };

  const updateAllMoneyStorages = () => {
    updateMoneyStoragesList();
    updateObligationAccountList();
  };

  return {
    moneyStorages,
    isMoneyStoragesLoading,
    isCreateItemLoading,
    activeMoneyStorages,
    updateMoneyStoragesList,
    updateAllMoneyStorages,
    createMoneyStorage,
  };
};
