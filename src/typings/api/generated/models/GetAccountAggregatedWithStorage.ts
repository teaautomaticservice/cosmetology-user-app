/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CurrencyDto } from './CurrencyDto';
import type { MoneyStorageDto } from './MoneyStorageDto';
export type GetAccountAggregatedWithStorage = {
    name: string;
    status: GetAccountAggregatedWithStorage.status;
    currency: CurrencyDto;
    balance: number;
    available: number;
    moneyStorages: Array<MoneyStorageDto>;
};
export namespace GetAccountAggregatedWithStorage {
    export enum status {
        CREATED = 'created',
        ACTIVE = 'active',
        FREEZED = 'freezed',
        DEACTIVATED = 'deactivated',
    }
}

