import { HistoryService } from "@typings/api/generated";

import type { HistoriesList, History } from "../typings/api/historyMessage";
import type { ID } from "../typings/common";
import { transport } from "../utils/transport";

const baseUrl = (path = "") => `/history${path}`;

const historyMessagesUrls = {
  messageList: baseUrl("/list"),
  messageById: (id: ID) => baseUrl(`/${id}`),
};

export const historyMessagesMethods = {
  getHistoryById: async (id: ID) => {
    const { data } = await transport.get<History>(historyMessagesUrls.messageById(id));
    return data;
  },
  addHistory: async (message: string) => {
    const { data } = await transport.post(baseUrl(), { message });
    return data;
  },
  updateHistory: async (id: ID, message: string) => {
    const { data } = await transport.patch(historyMessagesUrls.messageById(id), { message });
    return data;
  },
  removeHistory: async (id: ID) => {
    const { data } = await transport.delete(historyMessagesUrls.messageById(id));
    return data;
  },
};

export const getHistoriesMessageList = async (): Promise<HistoriesList> => {
  return HistoryService.historyControllerGetList();
}

export const createNewHistoryMessage = async (message: string): Promise<HistoriesList> => {
  return HistoryService.historyControllerAddItem({ requestBody: { message }})
}
