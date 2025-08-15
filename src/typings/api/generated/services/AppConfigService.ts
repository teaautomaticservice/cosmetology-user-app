/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppConfigDto } from '../models/AppConfigDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppConfigService {
    /**
     * @returns AppConfigDto App config has been got
     * @throws ApiError
     */
    public static appConfigControllerGetAppConfig(): CancelablePromise<AppConfigDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/app-config',
        });
    }
}
