import type { History } from "../typings/api/historyMessage";
import { storeFactory } from "../utils/storeFactory";

interface ModalStore {
  history: History | null;
}

const { useStore, useChangeEvent } = storeFactory<ModalStore>({
  history: null,
});

export const useModalStore = () => {
  const store = useStore();

  const close = useChangeEvent<void>((state) => ({
    ...state,
    history: null,
  }));

  const open = useChangeEvent<History>((state, payload) => ({
    ...state,
    history: payload,
  }));

  const isOpen = store.history === null ? false : true;
  const history = store.history;

  return {
    isOpen,
    history,
    close,
    open,
  };
};
