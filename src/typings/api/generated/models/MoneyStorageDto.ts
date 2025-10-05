/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MoneyStorageDto = {
    id: number;
    name: string;
    status: MoneyStorageDto.status;
    code: string;
    description?: string | null;
};
export namespace MoneyStorageDto {
    export enum status {
        ACTIVE = 'active',
        DISABLED = 'disabled',
    }
}

