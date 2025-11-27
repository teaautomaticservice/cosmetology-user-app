/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CurrencyDto } from './CurrencyDto';
import type { MoneyStorageDto } from './MoneyStorageDto';
export type GetAccountDto = {
    id: number;
    name: string;
    moneyStorageId: number;
    status: GetAccountDto.status;
    currencyId: number;
    currency: CurrencyDto;
    balance: number;
    available: number;
    description: string | null;
    moneyStorage: MoneyStorageDto | null;
};
export namespace GetAccountDto {
    export enum status {
        CREATED = 'created',
        ACTIVE = 'active',
        FREEZED = 'freezed',
        DEACTIVATED = 'deactivated',
    }
}

