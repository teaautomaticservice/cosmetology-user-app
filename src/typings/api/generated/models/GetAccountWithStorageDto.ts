/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CurrencyDto } from './CurrencyDto';
import type { MoneyStorageDto } from './MoneyStorageDto';
export type GetAccountWithStorageDto = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    status: GetAccountWithStorageDto.status;
    balance: number;
    available: number;
    description: string | null;
    moneyStorage: MoneyStorageDto | null;
    currency: CurrencyDto;
};
export namespace GetAccountWithStorageDto {
    export enum status {
        CREATED = 'created',
        ACTIVE = 'active',
        FREEZED = 'freezed',
        DEACTIVATED = 'deactivated',
    }
}

