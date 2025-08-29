/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UsersDto = {
    id: number;
    createdAt: string;
    updatedAt: string;
    email: string;
    status: UsersDto.status;
    type: UsersDto.type;
    displayName: string;
};
export namespace UsersDto {
    export enum status {
        BLOCKED = 'blocked',
        DELETED = 'deleted',
        DELETED_BY_GDPR = 'deletedByGdpr',
        PENDING = 'pending',
        ACTIVE = 'active',
        BANNED = 'banned',
        DEACTIVATED = 'deactivated',
    }
    export enum type {
        CLIENT = 'client',
        OPERATOR = 'operator',
        ADMINISTRATOR = 'administrator',
        SUPER_ADMINISTRATOR = 'superAdministrator',
    }
}

