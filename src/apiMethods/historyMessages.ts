import { getSearchParams } from "@shared/utils/getSearchParams";
import { HistoryService } from "@typings/api/generated";

import type { HistoriesList } from "../typings/api/historyMessage";

export const getHistoriesMessageListApi = async (): Promise<HistoriesList> => {
  const { page, pageSize } = getSearchParams<{ page?: string; pageSize?: string; }>();
  return HistoryService.historyControllerGetList({
    ...(page && { page: Number(page) }),
    ...(pageSize && { pageSize: Number(pageSize) }),
  });
}

export const createNewHistoryMessageApi = async (message: string): Promise<HistoriesList> => {
  const { pageSize } = getSearchParams<{ page?: string; pageSize?: string; }>();
  return HistoryService.historyControllerAddItem({
    requestBody: { message },
    ...(pageSize && { pageSize: Number(pageSize) }),
  })
}

export const deleteHistoryMessageByIdApi = async (id: string): Promise<HistoriesList> => {
  const { pageSize } = getSearchParams<{ page?: string; pageSize?: string; }>();
  return HistoryService.historyControllerRemoveItem({
    id,
    ...(pageSize && { pageSize: Number(pageSize) }),
  });
}

export const updateHistoryMessageByIdApi = async (id: string, message: string) => {
  const { page, pageSize } = getSearchParams<{ page?: string; pageSize?: string; }>();
  return HistoryService.historyControllerUpdateItem({
    id,
    requestBody: { message },
    ...(page && { page: Number(page) }),
    ...(pageSize && { pageSize: Number(pageSize) }),
  });
}
