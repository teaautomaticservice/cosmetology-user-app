/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CurrencyDto = {
    id: number;
    name: string;
    status: CurrencyDto.status;
    code: string;
};
export namespace CurrencyDto {
    export enum status {
        ACTIVE = 'active',
        DISABLED = 'disabled',
    }
}

