import { getConfig } from '@apiMethods/appConfigApi';
import { sendLogin,sendLogOut } from '@apiMethods/authorizationApi';
import { storeFactory } from '@utils/storeFactory';
import { AppConfig } from 'src/typings/api/appConfig';
import { LoginFormDto } from 'src/typings/api/generated';

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

  return {
    appConfigStore,
    isAppConfigLoaded,
    isAuthLoading,
    logOut,
    login,
    getAppConfigFromApi,
  }
}