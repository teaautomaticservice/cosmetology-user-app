import { AxiosError } from 'axios';

export type ID = number;

export type CustomAxiosError = AxiosError & {
  message: string;
  name: string;
  stack?: string;
  code?: string;
  status?: number;
  showCaptcha?: boolean;
  response: {
    data: {
      message: string;
      cause: {
        [key: string]: string;
      };
      show_captcha?: boolean;
    };
  };
};
