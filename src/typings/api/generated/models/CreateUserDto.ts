/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateUserDto = {
    email: string;
    type: CreateUserDto.type;
    displayName?: string | null;
};
export namespace CreateUserDto {
    export enum type {
        CLIENT = 'client',
        OPERATOR = 'operator',
        ADMINISTRATOR = 'administrator',
        SUPER_ADMINISTRATOR = 'superAdministrator',
    }
}

