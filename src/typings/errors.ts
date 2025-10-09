import { AxiosError, AxiosResponse } from 'axios';

export interface UserDataApiError<Cause = undefined> {
  statusCode: number;
  message?: string;
  cause?: Record<keyof Cause, string[]>;
}

interface ErrorResponse extends AxiosResponse<unknown, any> {
  data: UserDataApiError;
}

export interface ApiError extends AxiosError {
  response: ErrorResponse | undefined;
}
