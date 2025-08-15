/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CurrentUserDto = {
    email: string;
    displayName: string;
    status: CurrentUserDto.status;
    type: CurrentUserDto.type;
};
export namespace CurrentUserDto {
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

