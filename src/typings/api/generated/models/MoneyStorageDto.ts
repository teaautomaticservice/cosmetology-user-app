/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MoneyStorageDto = {
    id: number;
    name: string;
    status: MoneyStorageDto.status;
    type: MoneyStorageDto.type;
    code: string;
    description: string | null;
};
export namespace MoneyStorageDto {
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

