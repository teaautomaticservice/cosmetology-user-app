/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetAccountDto } from './GetAccountDto';
export type GetAccountsByStoreDto = {
    id: number;
    name: string;
    status: GetAccountsByStoreDto.status;
    type: GetAccountsByStoreDto.type;
    code: string;
    description: string | null;
    accounts: Array<GetAccountDto>;
    balance: number;
    available: number;
};
export namespace GetAccountsByStoreDto {
    export enum status {
        CREATED = 'created',
        ACTIVE = 'active',
        FREEZED = 'freezed',
        DEACTIVATED = 'deactivated',
    }
    export enum type {
        COMMON = 'common',
        OBLIGATION = 'obligation',
    }
}

