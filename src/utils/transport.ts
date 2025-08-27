import axios from "axios";

import { env } from './env';

const apiUrl = env.REACT_APP_API_URL;

export const transport = axios.create({
  ...(apiUrl && {
    baseURL: apiUrl,
  }),
  headers: {
    'Content-Type': 'application/json',
    'cache-control': 'no-cache',
  },
  withCredentials: true,
});
