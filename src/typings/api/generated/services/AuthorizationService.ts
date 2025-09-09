/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CurrentUserDto } from '../models/CurrentUserDto';
import type { LoginFormDto } from '../models/LoginFormDto';
import type { SetupNewPasswordDto } from '../models/SetupNewPasswordDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthorizationService {
    /**
     * @returns CurrentUserDto User success login
     * @throws ApiError
     */
    public static authorizationControllerLogin({
        requestBody,
    }: {
        /**
         * User login
         */
        requestBody: LoginFormDto,
    }): CancelablePromise<CurrentUserDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/authorization/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any User success log out
     * @throws ApiError
     */
    public static authorizationControllerLogOut(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/authorization/logout',
        });
    }
    /**
     * @returns CurrentUserDto User success login
     * @throws ApiError
     */
    public static authorizationControllerAuthByUserToken({
        userToken,
    }: {
        userToken: string,
    }): CancelablePromise<CurrentUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/authorization/auth-by-user-token',
            query: {
                'userToken': userToken,
            },
        });
    }
    /**
     * @returns CurrentUserDto User success login
     * @throws ApiError
     */
    public static authorizationControllerSetupNewPassword({
        requestBody,
    }: {
        /**
         * User login
         */
        requestBody: SetupNewPasswordDto,
    }): CancelablePromise<CurrentUserDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/authorization/setup-new-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
