import type { History } from "../typings/api/historyMessage";
import { storeFactory } from "../utils/storeFactory";

interface ModalStore {
  history: History | null;
}

const { useStore, useChangeEvent } = storeFactory<ModalStore>({
  history: null,
});

export const useModalStore = () => {
  const [state] = useStore();

  const close = useChangeEvent<void>((state) => ({
    ...state,
    history: null,
  }));

  const open = useChangeEvent<History>((state, payload) => ({
    ...state,
    history: payload,
  }));

  const isOpen = state.history === null ? false : true;
  const history = state.history;

  return {
    isOpen,
    history,
    close,
    open,
  };
};
