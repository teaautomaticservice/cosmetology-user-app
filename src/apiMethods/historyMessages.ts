import type { ID } from "../typings/common";
import type { HistoryList, History } from "../typings/api/historyMessage";

import { transport } from "../utils/transport";

const baseUrl = (path = "") => `/history${path}`;

const historyMessagesUrls = {
  messageList: baseUrl("/list"),
  messageById: (id: ID) => baseUrl(`/${id}`),
};

export const historyMessagesMethods = {
  getMessageList: async () => {
    const { data } = await transport.get<HistoryList>(historyMessagesUrls.messageList);
    return data;
  },
  getHistoryById: async (id: ID) => {
    const { data } = await transport.get<History>(historyMessagesUrls.messageById(id));
    return data;
  },
  addHistory: async (message: string) => {
    const { data } = await transport.post<HistoryList>(baseUrl(), { message });
    return data;
  },
  updateHistory: async (id: ID, message: string) => {
    const { data } = await transport.patch<HistoryList>(historyMessagesUrls.messageById(id), { message });
    return data;
  },
  removeHistory: async (id: ID) => {
    const { data } = await transport.delete<HistoryList>(historyMessagesUrls.messageById(id));
    return data;
  },
};
