
import { historyMessagesMethods } from '@apiMethods/historyMessages';
import { useHistoryMessagesStore } from '@stores/historyMessages';
import { useModalStore } from '@stores/modal';
import { History } from '@typings/api/historyMessage';
import { ID } from '@typings/common';
import { MODALS_TYPE } from '@typings/modals';

export const useTableMessages = () => {
  const { historyMessages, updateHistoryMessages, isHistoryLoading } = useHistoryMessagesStore();
  const { open } = useModalStore();

  const deleteMessage = async (id: ID) => {
    const { data } = await historyMessagesMethods.removeHistory(id);
    updateHistoryMessages(data);
  }

  const editMessage = (history: History) => {
    open(MODALS_TYPE.HISTORY, { history });
  }

  return {
    data: historyMessages,
    deleteMessage,
    editMessage,
    isHistoryLoading,
  }
};
