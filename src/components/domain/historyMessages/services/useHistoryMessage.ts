import { useHistoryMessagesStore } from "../../../../stores/historyMessages";

export const useHistoryMessage = () => {
  const { updateHistoryMessagesFromApi, isHistoryLoading } = useHistoryMessagesStore();

  const updateHistories = () => updateHistoryMessagesFromApi()

  return {
    updateHistories,
    isHistoryLoading,
  }
}