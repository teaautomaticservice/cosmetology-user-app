import {
  createNewHistoryMessage,
  getHistoriesMessageList,
} from "../apiMethods/historyMessages";
import type { History } from "../typings/api/historyMessage";
import { storeFactory } from "../utils/storeFactory";

const {
  useStore: useHistoryStore,
  useMiddleWare: useHistoryCreateEffect,
} = storeFactory<History[]>([]);
const { useStore: useIsLoadingStore } = storeFactory<boolean>(false);

export const useHistoryMessagesStore = () => {
  const [historyMessages, setNewHistory] = useHistoryStore();

  const [isHistoryLoading, setIsLoading] = useIsLoadingStore();

  const handleResponse = async () => {
    setIsLoading(true);
    const { data } = await getHistoriesMessageList();
    setIsLoading(false);
    return data;
  }

  const updateHistoryMessagesFromApi = useHistoryCreateEffect<void>(handleResponse);

  // TODO: Legacy. Should be removed
  const updateHistoryMessages = (history: History[]) => {
    setIsLoading(true);
    setNewHistory(history)
    setIsLoading(false);
  };

  const createHistoryMessage = async (message: string) => {
    setIsLoading(true);
    try {
      const { data } = await createNewHistoryMessage(message);
      setNewHistory(data);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    historyMessages,
    isHistoryLoading,
    updateHistoryMessages,
    updateHistoryMessagesFromApi,
    createHistoryMessage,
  };
};
