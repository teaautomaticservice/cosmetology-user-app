/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountsByStorePaginated } from '../models/AccountsByStorePaginated';
import type { AccountsWithStoragePaginatedDto } from '../models/AccountsWithStoragePaginatedDto';
import type { CreateCurrencyDto } from '../models/CreateCurrencyDto';
import type { CreateMoneyStorageDto } from '../models/CreateMoneyStorageDto';
import type { CurrencyPaginatedDto } from '../models/CurrencyPaginatedDto';
import type { MoneyStorageDto } from '../models/MoneyStorageDto';
import type { MoneyStoragePaginatedDto } from '../models/MoneyStoragePaginatedDto';
import type { UpdateMoneyStorageDto } from '../models/UpdateMoneyStorageDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CashierService {
    /**
     * @returns CurrencyPaginatedDto List of currencies
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
         * Create currency
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
     * @returns any Currency deleted
     * @throws ApiError
     */
    public static currenciesControllerRemoveItem({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/cashier/currencies/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns MoneyStoragePaginatedDto List of money storages successful has been got
     * @throws ApiError
     */
    public static moneyStoragesControllerGetList({
        page,
        pageSize,
        order,
        sort,
    }: {
        page?: number,
        pageSize?: number,
        order?: 'ASC' | 'DESC',
        sort?: 'name' | 'code',
    }): CancelablePromise<MoneyStoragePaginatedDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cashier/money-storages/list',
            query: {
                'page': page,
                'pageSize': pageSize,
                'order': order,
                'sort': sort,
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
    /**
     * @returns MoneyStorageDto Money storage successful updated
     * @throws ApiError
     */
    public static moneyStoragesControllerUpdateItem({
        id,
        requestBody,
    }: {
        id: string,
        /**
         * Update money storage body
         */
        requestBody: UpdateMoneyStorageDto,
    }): CancelablePromise<MoneyStorageDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/cashier/money-storages/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any Money storage successful deleted
     * @throws ApiError
     */
    public static moneyStoragesControllerRemoveItem({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/cashier/money-storages/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns MoneyStorageDto Money storage successful created
     * @throws ApiError
     */
    public static moneyStoragesControllerCreateItem({
        requestBody,
    }: {
        /**
         * Create money storage body
         */
        requestBody: CreateMoneyStorageDto,
    }): CancelablePromise<MoneyStorageDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cashier/money-storages',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns AccountsByStorePaginated List of accounts by money storages successful
     * @throws ApiError
     */
    public static accountsControllerGetAccountsByMoneyStoragesList({
        page,
        pageSize,
        sort,
        order,
    }: {
        page?: number,
        pageSize?: number,
        sort?: 'status',
        order?: 'ASC' | 'DESC',
    }): CancelablePromise<AccountsByStorePaginated> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cashier/accounts/accounts-by-money-storages-list',
            query: {
                'page': page,
                'pageSize': pageSize,
                'sort': sort,
                'order': order,
            },
        });
    }
    /**
     * @returns AccountsWithStoragePaginatedDto List of accounts with money storages
     * @throws ApiError
     */
    public static accountsControllerGetList({
        page,
        pageSize,
        sort,
        order,
    }: {
        page?: number,
        pageSize?: number,
        sort?: 'status' | 'available' | 'balance' | 'name' | 'createdAt' | 'updatedAt',
        order?: 'ASC' | 'DESC',
    }): CancelablePromise<AccountsWithStoragePaginatedDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cashier/accounts/list',
            query: {
                'page': page,
                'pageSize': pageSize,
                'sort': sort,
                'order': order,
            },
        });
    }
}
