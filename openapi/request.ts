import { transport } from '@utils/transport';

import { ApiRequestOptions } from './ApiRequestOptions';
import { CancelablePromise } from './CancelablePromise';
import type { OpenAPIConfig } from './OpenAPI';

export const request = <T>(config: OpenAPIConfig, options: ApiRequestOptions): CancelablePromise<T> => {
  return new CancelablePromise((resolve, reject, onCancel) => {
    let params: URLSearchParams | undefined;

    if (options.path) {
      params = new URLSearchParams();
      Object.entries(options.path).forEach(([key, val]) => {
        if (val !== undefined) {
          (params as URLSearchParams).set(key, val)
        }
      });
    }
    
    transport.request<T>({
      url: options.url,
      method: options.method,
      params,
      data: options.body,
    })
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  })
}
