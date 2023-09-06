import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL

export const transport = axios.create({
  ...(apiUrl && {
    baseURL: apiUrl,
  }),
  headers: {
    'Content-Type': 'application/json',
  },
});
