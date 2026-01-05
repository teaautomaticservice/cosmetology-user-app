/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountsAggregatedWithStoragePaginated } from '../models/AccountsAggregatedWithStoragePaginated';
import type { AccountsByStorePaginated } from '../models/AccountsByStorePaginated';
import type { AccountStatus } from '../models/AccountStatus';
import type { AccountsWithStoragePaginatedDto } from '../models/AccountsWithStoragePaginatedDto';
import type { CreateAccountDto } from '../models/CreateAccountDto';
import type { CreateCurrencyDto } from '../models/CreateCurrencyDto';
import type { CreateMoneyStorageDto } from '../models/CreateMoneyStorageDto';
import type { CurrencyDto } from '../models/CurrencyDto';
import type { CurrencyPaginatedDto } from '../models/CurrencyPaginatedDto';
import type { GetAccountWithStorageDto } from '../models/GetAccountWithStorageDto';
import type { MoneyStorageDto } from '../models/MoneyStorageDto';
import type { MoneyStoragePaginatedDto } from '../models/MoneyStoragePaginatedDto';
import type { NewLoanDto } from '../models/NewLoanDto';
import type { NewLoanRepaymentDto } from '../models/NewLoanRepaymentDto';
import type { NewOpenBalanceObligationDto } from '../models/NewOpenBalanceObligationDto';
import type { NewTransactionDto } from '../models/NewTransactionDto';
import type { NewTransferDto } from '../models/NewTransferDto';
import type { TransactionsPaginated } from '../models/TransactionsPaginated';
import type { UpdateAccountDto } from '../models/UpdateAccountDto';
import type { UpdateAccountListDto } from '../models/UpdateAccountListDto';
import type { UpdateCurrencyDto } from '../models/UpdateCurrencyDto';
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
     * @returns CurrencyDto Currency update
     * @throws ApiError
     */
    public static currenciesControllerUpdateItem({
        id,
        requestBody,
    }: {
        id: string,
        /**
         * Currency body
         */
        requestBody: UpdateCurrencyDto,
    }): CancelablePromise<CurrencyDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/cashier/currencies/{id}',
            path: {
                'id': id,
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
     * @returns MoneyStoragePaginatedDto Obligation account of money storages successful has been got
     * @throws ApiError
     */
    public static moneyStoragesControllerGetObligationAccounts({
        page,
        pageSize,
    }: {
        page?: number,
        pageSize?: number,
    }): CancelablePromise<MoneyStoragePaginatedDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cashier/money-storages/obligation-accounts',
            query: {
                'page': page,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * @returns MoneyStorageDto Obligation storage successful created
     * @throws ApiError
     */
    public static moneyStoragesControllerCreateObligationItem({
        requestBody,
    }: {
        /**
         * Create obligation storage body
         */
        requestBody: CreateMoneyStorageDto,
    }): CancelablePromise<MoneyStorageDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cashier/money-storages/obligation-account',
            body: requestBody,
            mediaType: 'application/json',
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
     * @returns AccountsByStorePaginated List of accounts by money storages successful
     * @throws ApiError
     */
    public static accountsControllerGetAccountsByObligationStoragesList({
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
            url: '/cashier/accounts/accounts-by-obligation-storages-list',
            query: {
                'page': page,
                'pageSize': pageSize,
                'sort': sort,
                'order': order,
            },
        });
    }
    /**
     * @returns AccountsAggregatedWithStoragePaginated List of accounts with money storages
     * @throws ApiError
     */
    public static accountsControllerGetAccountsAggregatedWithStorageList({
        page,
        pageSize,
        order,
        balanceFrom,
        balanceTo,
        sort,
    }: {
        page?: number,
        pageSize?: number,
        order?: 'ASC' | 'DESC',
        balanceFrom?: number,
        balanceTo?: number,
        sort?: 'status' | 'available' | 'balance' | 'name',
    }): CancelablePromise<AccountsAggregatedWithStoragePaginated> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cashier/accounts/accounts-aggregated-with-storage-list',
            query: {
                'page': page,
                'pageSize': pageSize,
                'order': order,
                'balanceFrom': balanceFrom,
                'balanceTo': balanceTo,
                'sort': sort,
            },
        });
    }
    /**
     * @returns AccountsAggregatedWithStoragePaginated List of obligation accounts with money storages
     * @throws ApiError
     */
    public static accountsControllerGetObligationAccountsAggregatedWithStorageList({
        page,
        pageSize,
        order,
        balanceFrom,
        balanceTo,
        sort,
    }: {
        page?: number,
        pageSize?: number,
        order?: 'ASC' | 'DESC',
        balanceFrom?: number,
        balanceTo?: number,
        sort?: 'status' | 'available' | 'balance' | 'name',
    }): CancelablePromise<AccountsAggregatedWithStoragePaginated> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cashier/accounts/obligation-accounts-aggregated-with-storage-list',
            query: {
                'page': page,
                'pageSize': pageSize,
                'order': order,
                'balanceFrom': balanceFrom,
                'balanceTo': balanceTo,
                'sort': sort,
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
        moneyStoragesIds,
        status,
        query,
        balanceFrom,
        balanceTo,
    }: {
        page?: number,
        pageSize?: number,
        sort?: 'status' | 'name',
        order?: 'ASC' | 'DESC',
        moneyStoragesIds?: Array<string>,
        status?: Array<AccountStatus>,
        query?: string,
        balanceFrom?: number,
        balanceTo?: number,
    }): CancelablePromise<AccountsWithStoragePaginatedDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cashier/accounts/list',
            query: {
                'page': page,
                'pageSize': pageSize,
                'sort': sort,
                'order': order,
                'moneyStoragesIds': moneyStoragesIds,
                'status': status,
                'query': query,
                'balanceFrom': balanceFrom,
                'balanceTo': balanceTo,
            },
        });
    }
    /**
     * @returns AccountsWithStoragePaginatedDto List of accounts with obligation storages
     * @throws ApiError
     */
    public static accountsControllerGetObligationList({
        page,
        pageSize,
        sort,
        order,
        moneyStoragesIds,
        status,
        query,
        balanceFrom,
        balanceTo,
    }: {
        page?: number,
        pageSize?: number,
        sort?: 'status' | 'name',
        order?: 'ASC' | 'DESC',
        moneyStoragesIds?: Array<string>,
        status?: Array<AccountStatus>,
        query?: string,
        balanceFrom?: number,
        balanceTo?: number,
    }): CancelablePromise<AccountsWithStoragePaginatedDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cashier/accounts/obligation-list',
            query: {
                'page': page,
                'pageSize': pageSize,
                'sort': sort,
                'order': order,
                'moneyStoragesIds': moneyStoragesIds,
                'status': status,
                'query': query,
                'balanceFrom': balanceFrom,
                'balanceTo': balanceTo,
            },
        });
    }
    /**
     * @returns GetAccountWithStorageDto New currency successful created
     * @throws ApiError
     */
    public static accountsControllerCreateAccount({
        requestBody,
    }: {
        /**
         * Create account
         */
        requestBody: CreateAccountDto,
    }): CancelablePromise<GetAccountWithStorageDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cashier/accounts/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns boolean Currency update
     * @throws ApiError
     */
    public static accountsControllerUpdateItems({
        requestBody,
    }: {
        /**
         * Update account list body
         */
        requestBody: UpdateAccountListDto,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/cashier/accounts/update-items',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns GetAccountWithStorageDto Update account body
     * @throws ApiError
     */
    public static accountsControllerUpdateItem({
        id,
        requestBody,
    }: {
        id: string,
        /**
         * Currency body
         */
        requestBody: UpdateAccountDto,
    }): CancelablePromise<GetAccountWithStorageDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/cashier/accounts/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any Account deleted
     * @throws ApiError
     */
    public static accountsControllerRemoveItem({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/cashier/accounts/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns TransactionsPaginated List of transactions
     * @throws ApiError
     */
    public static transactionsControllerGetList({
        page,
        pageSize,
    }: {
        page?: number,
        pageSize?: number,
    }): CancelablePromise<TransactionsPaginated> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cashier/transactions/list',
            query: {
                'page': page,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * @returns boolean New transaction Open Balance successful created
     * @throws ApiError
     */
    public static transactionsControllerOpenBalance({
        requestBody,
    }: {
        /**
         * Opening balance
         */
        requestBody: NewTransactionDto,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cashier/transactions/opening-balance',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns boolean Obligation storage successful created
     * @throws ApiError
     */
    public static transactionsControllerCreateObligationItem({
        requestBody,
    }: {
        /**
         * Open balance for obligation account
         */
        requestBody: NewOpenBalanceObligationDto,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cashier/transactions/opening-balance-obligation-account',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any New transaction Cash Out successful created
     * @throws ApiError
     */
    public static transactionsControllerCashOut({
        requestBody,
    }: {
        /**
         * Cash out
         */
        requestBody: NewTransactionDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cashier/transactions/cash-out',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any New transaction Receipt successful created
     * @throws ApiError
     */
    public static transactionsControllerReceipt({
        requestBody,
    }: {
        /**
         * receipt
         */
        requestBody: NewTransactionDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cashier/transactions/receipt',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any New transaction Loan successful created
     * @throws ApiError
     */
    public static transactionsControllerLoan({
        requestBody,
    }: {
        /**
         * Loan
         */
        requestBody: NewLoanDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cashier/transactions/loan',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any New transaction Loan Repayment successful created
     * @throws ApiError
     */
    public static transactionsControllerLoanRepayment({
        requestBody,
    }: {
        /**
         * Loan
         */
        requestBody: NewLoanRepaymentDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cashier/transactions/loan-repayment',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any New transaction Transfer Repayment successful created
     * @throws ApiError
     */
    public static transactionsControllerTransfer({
        requestBody,
    }: {
        /**
         * Transfer
         */
        requestBody: NewTransferDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cashier/transactions/transfer',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
