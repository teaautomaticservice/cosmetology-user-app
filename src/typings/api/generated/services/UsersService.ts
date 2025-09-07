/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { InitiateHardResetPasswordDto } from '../models/InitiateHardResetPasswordDto';
import type { UsersDto } from '../models/UsersDto';
import type { UsersPaginatedDto } from '../models/UsersPaginatedDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * @returns UsersPaginatedDto List of users successful has been got
     * @throws ApiError
     */
    public static usersControllerGetUsers({
        page,
        pageSize,
    }: {
        page?: number,
        pageSize?: number,
    }): CancelablePromise<UsersPaginatedDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
            path: {
                'page': page,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * @returns UsersDto User by ID successful has been got
     * @throws ApiError
     */
    public static usersControllerGetUserById({
        id,
    }: {
        id: number,
    }): CancelablePromise<UsersDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns UsersDto User was created
     * @throws ApiError
     */
    public static usersControllerCreateUser({
        requestBody,
    }: {
        /**
         * Create user
         */
        requestBody: CreateUserDto,
    }): CancelablePromise<UsersDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns UsersDto Hard reset password has been initiated
     * @throws ApiError
     */
    public static usersControllerInitiateHardResetPassword({
        requestBody,
    }: {
        /**
         * Initiate hard reset password for user
         */
        requestBody: InitiateHardResetPasswordDto,
    }): CancelablePromise<UsersDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/initiate-hard-reset-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns UsersDto Restart complete registration has been initiated
     * @throws ApiError
     */
    public static usersControllerRestartCompleteRegistration({
        id,
    }: {
        id: number,
    }): CancelablePromise<UsersDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/restart-complete-registration/{id}',
            query: {
                'id': id,
            },
        });
    }
}
