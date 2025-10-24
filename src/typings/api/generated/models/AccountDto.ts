/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AccountDto = {
    id: number;
    name: string;
    moneyStorageId: number;
    status: AccountDto.status;
    currencyId: number;
    balance: number;
    available: number;
    description: string | null;
};
export namespace AccountDto {
    export enum status {
        CREATED = 'created',
        ACTIVE = 'active',
        FREEZED = 'freezed',
        DEACTIVATED = 'deactivated',
    }
}

