import {
  createNewHistoryMessageApi,
  deleteHistoryMessageByIdApi,
  getHistoriesMessageListApi,
  updateHistoryMessageByIdApi,
} from "../apiMethods/historyMessages";
import type { History } from "../typings/api/historyMessage";
import { storeFactory } from "../utils/storeFactory";

const {
  useStore: useHistoryStore,
  useMiddleWare: useHistoryCreateEffect,
} = storeFactory<{
  historyList: History[];
}>({
  historyList: [],
});
const { useStore: useIsLoadingStore } = storeFactory<boolean>(false);

export const useHistoryMessagesStore = () => {
  const [historyMessages, setNewHistory] = useHistoryStore();
  const [isHistoryLoading, setIsLoading] = useIsLoadingStore();

  const { historyList } = historyMessages;

  const handleResponse = async () => {
    setIsLoading(true);
    const { data } = await getHistoriesMessageListApi();
    setIsLoading(false);
    return { historyList: data };
  }

  const updateHistoryMessagesFromApi = useHistoryCreateEffect<void>(handleResponse);

  const createHistoryMessage = async (message: string) => {
    setIsLoading(true);
    try {
      const { data } = await createNewHistoryMessageApi(message);
      setNewHistory({
        historyList: data,
      })
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHistoryMessage = async (id: string) => {
    setIsLoading(true);
    try {
      const { data } = await deleteHistoryMessageByIdApi(id);
      setNewHistory({ historyList: data });
    } finally {
      setIsLoading(false);
    }
  };

  const updateHistoryMessageById = async (id: string, message: string) => {
    setIsLoading(true);
    try {
      const { data } = await updateHistoryMessageByIdApi(id, message);
      setNewHistory({ historyList: data });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    historyMessages: historyList,
    isHistoryLoading,
    updateHistoryMessagesFromApi,
    createHistoryMessage,
    deleteHistoryMessage,
    updateHistoryMessageById,
  };
};
