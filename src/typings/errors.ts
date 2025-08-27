import { AxiosError, AxiosResponse } from 'axios';

export interface UserDataApiError {
  statusCode: number;
  message?: string;
  cause?: undefined;
}

interface ErrorResponse extends AxiosResponse<unknown, any> {
  data: UserDataApiError;
}

export interface ApiError extends AxiosError {
  response: ErrorResponse | undefined;
}