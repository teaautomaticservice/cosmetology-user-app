import { getConfig } from '@apiMethods/appConfigApi';
import { sendLogin, sendLogOut } from '@apiMethods/authorizationApi';
import { AppConfig } from '@typings/api/appConfig';
import { AuthorizationService, LoginFormDto } from '@typings/api/generated';
import { storeFactory } from '@utils/storeFactory';

const {
  useStore,
} = storeFactory<AppConfig>({
  currentUser: null,
});
const { useStore: useIsLoadingStore } = storeFactory<boolean>(false);
const { useStore: useIsAuthLoadingStore } = storeFactory<boolean>(false);

export const useAppConfigStore = () => {
  const [appConfigStore, updateAppConfig] = useStore();
  const [isAppConfigLoaded, setIsLoading] = useIsLoadingStore();
  const [isAuthLoading, setIsAuthLoading] = useIsAuthLoadingStore();

  const getAppConfigFromApi = async () => {
    try {
      if (isAppConfigLoaded) {
        setIsLoading(false);
      }
      const resp = await getConfig();
      updateAppConfig(resp);
    } finally {
      setIsLoading(true);
    }
  };

  const logOut = async () => {
    updateAppConfig({ currentUser: null });
    setIsAuthLoading(true);
    try {
      await sendLogOut();
    } finally {
      setIsAuthLoading(false);
    }
  };

  const login = async (loginForm: LoginFormDto) => {
    setIsAuthLoading(true);
    try {
      const currentUser = await sendLogin(loginForm);
      updateAppConfig({ currentUser })
    } finally {
      setIsAuthLoading(false);
    }
  };

  const loginByUserToken = async (userToken: string) => {
    setIsAuthLoading(true);
    try {
      const currentUser = await AuthorizationService.authorizationControllerAuthByUserToken({
        userToken,
      });
      if (currentUser) {
        updateAppConfig({ currentUser });
      }
    } catch(error) {
      // eslint-disable-next-line no-console
      console.error(error)
    } finally {
      setIsAuthLoading(false);
    }
  }

  const { currentUser } = appConfigStore;

  return {
    currentUser,
    isAppConfigLoaded,
    isAuthLoading,
    logOut,
    login,
    getAppConfigFromApi,
    loginByUserToken,
  }
}