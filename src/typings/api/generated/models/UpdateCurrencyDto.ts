/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateCurrencyDto = {
    name?: string;
    status?: UpdateCurrencyDto.status;
    code?: string;
};
export namespace UpdateCurrencyDto {
    export enum status {
        ACTIVE = 'active',
        DISABLED = 'disabled',
    }
}

