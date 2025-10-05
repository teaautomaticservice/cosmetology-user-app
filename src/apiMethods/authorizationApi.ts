import { AuthorizationService, LoginFormDto, SetupNewPasswordDto } from '@typings/api/generated';
import { type CurrentUser } from '@typings/api/users';

export const sendLogin = (loginForm: LoginFormDto): Promise<CurrentUser> =>
  AuthorizationService.authorizationControllerLogin({ requestBody: loginForm });

export const sendLogOut = () => AuthorizationService.authorizationControllerLogOut();

export const setupNewPassword= (setupNewPasswordForm: SetupNewPasswordDto) =>
  AuthorizationService.authorizationControllerSetupNewPassword({
    requestBody: setupNewPasswordForm,
  });
