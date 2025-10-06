import { interpolate } from '@shared/utils/interpolate';
import { transport } from '@utils/transport';

import { ApiRequestOptions } from './ApiRequestOptions';
import { CancelablePromise } from './CancelablePromise';
import type { OpenAPIConfig } from './OpenAPI';

export const request = <T>(config: OpenAPIConfig, options: ApiRequestOptions): CancelablePromise<T> => {
  return new CancelablePromise((resolve, reject) => {
    let params: URLSearchParams | undefined;
    let interpolatedUrl = options.url;

    if (options.path) {
      interpolatedUrl = interpolate(options.url, options.path);
    }

    if (options.query) {
      params = params || new URLSearchParams();
      Object.entries(options.query).forEach(([key, val]) => {
        if (val !== undefined) {
          (params as URLSearchParams).set(key, val);
        }
      });
    }
    
    transport.request<T>({
      url: interpolatedUrl,
      method: options.method,
      params,
      data: options.body,
    })
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};
