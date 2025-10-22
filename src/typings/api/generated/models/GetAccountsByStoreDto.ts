/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GetAccountsByStoreDto = {
    id: number;
    name: string;
    status: GetAccountsByStoreDto.status;
    code: string;
    description: string | null;
    accounts: Array<any[]>;
};
export namespace GetAccountsByStoreDto {
    export enum status {
        CREATED = 'created',
        ACTIVE = 'active',
        FREEZED = 'freezed',
        DEACTIVATED = 'deactivated',
    }
}

