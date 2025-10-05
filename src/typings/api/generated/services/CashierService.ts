/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCurrencyDto } from '../models/CreateCurrencyDto';
import type { CurrencyPaginatedDto } from '../models/CurrencyPaginatedDto';
import type { MoneyStorageDto } from '../models/MoneyStorageDto';
import type { MoneyStoragePaginatedDto } from '../models/MoneyStoragePaginatedDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CashierService {
    /**
     * @returns CurrencyPaginatedDto List of currencies successful has been got
     * @throws ApiError
     */
    public static currenciesControllerGetList({
        page,
        pageSize,
    }: {
        page?: number,
        pageSize?: number,
    }): CancelablePromise<CurrencyPaginatedDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cashier/currencies/list',
            query: {
                'page': page,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * @returns CurrencyPaginatedDto New currency successful created
     * @throws ApiError
     */
    public static currenciesControllerCreateCurrency({
        requestBody,
        pageSize,
    }: {
        /**
         * Create currency body
         */
        requestBody: CreateCurrencyDto,
        pageSize?: number,
    }): CancelablePromise<CurrencyPaginatedDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cashier/currencies/create',
            query: {
                'pageSize': pageSize,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns MoneyStoragePaginatedDto List of money storages successful has been got
     * @throws ApiError
     */
    public static moneyStoragesControllerGetList({
        page,
        pageSize,
    }: {
        page?: number,
        pageSize?: number,
    }): CancelablePromise<MoneyStoragePaginatedDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cashier/money-storages/list',
            query: {
                'page': page,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * @returns MoneyStorageDto Obligation account of money storages successful has been got
     * @throws ApiError
     */
    public static moneyStoragesControllerGetObligationAccount(): CancelablePromise<MoneyStorageDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cashier/money-storages/obligation-account',
        });
    }
}
