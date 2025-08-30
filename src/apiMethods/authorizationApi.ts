import { AuthorizationService, LoginFormDto } from '@typings/api/generated';
import { type CurrentUser } from '@typings/api/users'

export const sendLogin = (loginForm: LoginFormDto): Promise<CurrentUser> =>
  AuthorizationService.authorizationControllerLogin({ requestBody: loginForm });

export const sendLogOut = () => AuthorizationService.authorizationControllerLogOut();