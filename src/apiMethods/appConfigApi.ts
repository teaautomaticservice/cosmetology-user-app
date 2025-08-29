import { AppConfig } from 'src/typings/api/appConfig';
import { AppConfigService } from 'src/typings/api/generated';

export const getConfig = (): Promise<AppConfig> => AppConfigService.appConfigControllerGetAppConfig();
