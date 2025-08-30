import { AppConfig } from '@typings/api/appConfig';
import { AppConfigService } from '@typings/api/generated';

export const getConfig = (): Promise<AppConfig> => AppConfigService.appConfigControllerGetAppConfig();
