import { useAccountsStore } from '@stores/cashier/accounts';
import { storeFactory } from '@utils/storeFactory';

type Store = {
  isEditMode: boolean;
};

const {
  useStore,
} = storeFactory<Store>({
  isEditMode: false,
});

export const useAccountsPageStore = () => {
  const [state, updateState] = useStore();
  const { updateAccountsList } = useAccountsStore();

  const { isEditMode } = state;

  const toggleEditMode = () => {
    updateState(({ isEditMode }) => ({ isEditMode: !isEditMode }));
  };

  return {
    isEditMode,
    updateAccountsList,
    toggleEditMode,
  };
};
