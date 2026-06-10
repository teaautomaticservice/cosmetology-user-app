import { useCallback, useState } from 'react';
import { CustomAxiosError } from '@typings/common';

//eslint-disable-next-line
export const useApiCall = <TArgs extends any[], TResult>(
  apiFn: (...args: TArgs) => Promise<TResult>,
  options?: {
    onSuccess?: (result: TResult) => void;
    onError?: (error: unknown) => void;
    onFinally?: () => void;
  }
) => {
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [apiError, setApiError] = useState<CustomAxiosError>({} as CustomAxiosError);
  const [data, setData] = useState<TResult | null>(null);

  const execute = useCallback(
    async (...args: TArgs): Promise<TResult | undefined> => {
      setIsApiLoading(true);
      setApiError({} as CustomAxiosError);

      try {
        const result = await apiFn(...args);
        setData(result);
        options?.onSuccess?.(result);
        return result;
      } catch (err) {
        setApiError(err as CustomAxiosError);
        options?.onError?.(err);
        // eslint-disable-next-line
        console.error(err);
      } finally {
        setIsApiLoading(false);
        options?.onFinally?.();
      }
    },
    [apiFn, options]
  );

  return { execute, isApiLoading, apiError, data };
};
