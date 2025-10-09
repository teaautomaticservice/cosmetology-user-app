/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateMoneyStorageDto = {
    name?: string;
    status?: UpdateMoneyStorageDto.status;
    code?: string;
    description?: string;
};
export namespace UpdateMoneyStorageDto {
    export enum status {
        CREATED = 'created',
        ACTIVE = 'active',
        FREEZED = 'freezed',
        DEACTIVATED = 'deactivated',
    }
}

