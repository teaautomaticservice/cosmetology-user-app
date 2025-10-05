import { Pagination } from '@typings/api/common';

import {
  createNewHistoryMessageApi,
  deleteHistoryMessageByIdApi,
  getHistoriesMessageListApi,
  updateHistoryMessageByIdApi,
} from '../apiMethods/historyMessages';
import type { History } from '../typings/api/historyMessage';
import { storeFactory } from '../utils/storeFactory';

const {
  useStore: useHistoryStore,
  useMiddleWare: useHistoryCreateEffect,
} = storeFactory<{
  historyList: History[];
  pagination: Pagination;
}>({
  historyList: [],
  pagination: {
    count: 0,
    currentPage: 1,
    itemsPerPage: 10,
  }
});
const { useStore: useIsLoadingStore } = storeFactory<boolean>(false);

export const useHistoryMessagesStore = () => {
  const [historyMessages, setNewHistory] = useHistoryStore();
  const [isHistoryLoading, setIsLoading] = useIsLoadingStore();

  const {
    historyList,
    pagination,
  } = historyMessages;

  const handleResponse = async () => {
    setIsLoading(true);
    const { data, meta } = await getHistoriesMessageListApi();
    setIsLoading(false);
    return {
      historyList: data,
      pagination: meta,
    };
  };

  const updateHistoryMessagesFromApi = useHistoryCreateEffect<void>(handleResponse);

  const createHistoryMessage = async (message: string) => {
    setIsLoading(true);
    try {
      const { data, meta } = await createNewHistoryMessageApi(message);
      setNewHistory({
        historyList: data,
        pagination: meta,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHistoryMessage = async (id: string) => {
    setIsLoading(true);
    try {
      const { data, meta } = await deleteHistoryMessageByIdApi(id);
      setNewHistory({ historyList: data, pagination: meta });
    } finally {
      setIsLoading(false);
    }
  };

  const updateHistoryMessageById = async (id: string, message: string) => {
    setIsLoading(true);
    try {
      const { data, meta } = await updateHistoryMessageByIdApi(id, message);
      setNewHistory({ historyList: data, pagination: meta });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    historyMessages: historyList,
    isHistoryLoading,
    historyPagination: pagination,
    updateHistoryMessagesFromApi,
    createHistoryMessage,
    deleteHistoryMessage,
    updateHistoryMessageById,
  };
};
