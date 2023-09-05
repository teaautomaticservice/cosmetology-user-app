import type { History } from "../typings/api/historyMessage";
import { storeFactory } from "../utils/storeFactory";

import { historyMessagesMethods } from "../apiMethods/historyMessages";

const {
  useStore: useHistoryStore,
  useNewDataEvent: useHistoryNewDataEvent,
  useCreateEffect: useHistoryCreateEffect,
} = storeFactory<History[]>([]);
const { useStore: useIsLoadingStore, useNewDataEvent: useIsLoadingNewDataEvent } = storeFactory<boolean>(false);

export const useHistoryMessagesStore = () => {
  const historyMessages = useHistoryStore();
  const setNewHistory = useHistoryNewDataEvent();

  const isHistoryLoading = useIsLoadingStore();
  const setIsLoading = useIsLoadingNewDataEvent();


  const handleResponse = async () => {
    setIsLoading(true);
    const { data } = await historyMessagesMethods.getMessageList();
    setIsLoading(false);
    return data;
  }

  const updateHistoryMessagesFromApi = useHistoryCreateEffect<void>(handleResponse);
  const updateHistoryMessages = (history: History[]) => {
    setIsLoading(true);
    setNewHistory(history)
    setIsLoading(false);
  };

  return {
    historyMessages,
    updateHistoryMessages,
    updateHistoryMessagesFromApi,
    isHistoryLoading,
  };
};
