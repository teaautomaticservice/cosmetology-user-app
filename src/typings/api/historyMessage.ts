import type { ID } from "../common";

import type { List } from "./common";

export interface History {
  id: ID;
  date: string;
  owner: string;
  message: string;
}

export type HistoryList = List<History>;