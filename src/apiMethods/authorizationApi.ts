import { AuthorizationService, LoginFormDto } from 'src/typings/api/generated'
import { type CurrentUser } from 'src/typings/api/users'

export const sendLogin = (loginForm: LoginFormDto): Promise<CurrentUser> =>
  AuthorizationService.authorizationControllerLogin({ requestBody: loginForm });

export const sendLogOut = () => AuthorizationService.authorizationControllerLogOut();