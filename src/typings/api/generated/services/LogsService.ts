/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LogsPaginatedDto } from '../models/LogsPaginatedDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LogsService {
    /**
     * @returns LogsPaginatedDto List of logs successful has been got
     * @throws ApiError
     */
    public static logsControllerGetList({
        page,
        pageSize,
    }: {
        page?: number,
        pageSize?: number,
    }): CancelablePromise<LogsPaginatedDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/logs/list',
            query: {
                'page': page,
                'pageSize': pageSize,
            },
        });
    }
}
