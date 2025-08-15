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
    public static historyControllerGetList(): CancelablePromise<HistoryPaginatedDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/history/list',
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
    }: {
        id: string,
        /**
         * Update history body
         */
        requestBody: UpdateHistoryDto,
    }): CancelablePromise<HistoryPaginatedDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/history/{id}',
            path: {
                'id': id,
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
    }: {
        id: string,
    }): CancelablePromise<HistoryPaginatedDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
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
    public static historyControllerAddItem({
        requestBody,
    }: {
        /**
         * Update history body
         */
        requestBody: UpdateHistoryDto,
    }): CancelablePromise<HistoryPaginatedDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/history',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
