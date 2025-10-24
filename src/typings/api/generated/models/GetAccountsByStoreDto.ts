/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountDto } from './AccountDto';
export type GetAccountsByStoreDto = {
    id: number;
    name: string;
    status: GetAccountsByStoreDto.status;
    code: string;
    description: string | null;
    accounts: Array<AccountDto>;
};
export namespace GetAccountsByStoreDto {
    export enum status {
        CREATED = 'created',
        ACTIVE = 'active',
        FREEZED = 'freezed',
        DEACTIVATED = 'deactivated',
    }
}

