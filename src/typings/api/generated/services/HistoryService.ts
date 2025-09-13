/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HistoryDto } from '../models/HistoryDto';
import type { HistoryPaginatedDto } from '../models/HistoryPaginatedDto';
import type { UpdateHistoryDto } from '../models/UpdateHistoryDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class HistoryService {
    /**
     * @returns HistoryPaginatedDto List of history successful has been got
     * @throws ApiError
     */
    public static historyControllerGetList({
        page,
        pageSize,
    }: {
        page?: number,
        pageSize?: number,
    }): CancelablePromise<HistoryPaginatedDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/history/list',
            query: {
                'page': page,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * @returns HistoryDto History successful has been got
     * @throws ApiError
     */
    public static historyControllerGetItem({
        id,
    }: {
        id: number,
    }): CancelablePromise<HistoryDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/history/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns HistoryPaginatedDto History successful has been got
     * @throws ApiError
     */
    public static historyControllerUpdateItem({
        id,
        requestBody,
        page,
        pageSize,
    }: {
        id: string,
        /**
         * Update history body
         */
        requestBody: UpdateHistoryDto,
        page?: number,
        pageSize?: number,
    }): CancelablePromise<HistoryPaginatedDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/history/{id}',
            path: {
                'id': id,
            },
            query: {
                'page': page,
                'pageSize': pageSize,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns HistoryPaginatedDto History successful has been got
     * @throws ApiError
     */
    public static historyControllerRemoveItem({
        id,
        pageSize,
    }: {
        id: string,
        pageSize?: number,
    }): CancelablePromise<HistoryPaginatedDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/history/{id}',
            path: {
                'id': id,
            },
            query: {
                'pageSize': pageSize,
            },
        });
    }
    /**
     * @returns HistoryPaginatedDto History successful has been got
     * @throws ApiError
     */
    public static historyControllerAddItem({
        requestBody,
        pageSize,
    }: {
        /**
         * Update history body
         */
        requestBody: UpdateHistoryDto,
        pageSize?: number,
    }): CancelablePromise<HistoryPaginatedDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/history',
            query: {
                'pageSize': pageSize,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
