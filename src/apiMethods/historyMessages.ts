import { HistoryService } from "@typings/api/generated";

import type { HistoriesList } from "../typings/api/historyMessage";

export const getHistoriesMessageListApi = async (): Promise<HistoriesList> => {
  return HistoryService.historyControllerGetList();
}

export const createNewHistoryMessageApi = async (message: string): Promise<HistoriesList> => {
  return HistoryService.historyControllerAddItem({ requestBody: { message }})
}

export const deleteHistoryMessageByIdApi = async (id: string): Promise<HistoriesList> => {
  return HistoryService.historyControllerRemoveItem({ id });
}

export const updateHistoryMessageByIdApi = async (id: string, message: string) => {
  return HistoryService.historyControllerUpdateItem({ id, requestBody: { message }});
}
