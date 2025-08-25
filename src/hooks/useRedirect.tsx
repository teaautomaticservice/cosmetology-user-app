import { useEffect } from "react";
import { paths } from "@router/paths"
import { routerConfig } from "@router/routerConfig";
import { RouterRoleEnum } from "@router/types";
import { useAppConfigStore } from "@stores/appConfig";
import { generatePath, useLocation, useParams } from "react-router-dom";

export const useRedirect = () => {
  const { pathname } = useLocation();
  const { appConfigStore, getAppConfigFromApi } = useAppConfigStore();
  const params = useParams();

  useEffect(() => {
    getAppConfigFromApi();
  }, []);

  const getRedirectPath = (): string | null => {
    const currentConfig = routerConfig.find(({ path }) => {
      try {
        const finalPath = generatePath(path, params);
        return finalPath === pathname;
      } catch {
        return false;
      }
    })

    if (
      !currentConfig?.roles ||
      currentConfig.roles.includes(RouterRoleEnum.ALL)
    ) {
      return null;
    }

    const { currentUser } = appConfigStore;
    const { roles } = currentConfig;
    const isUnauthorizedRoute = roles.includes('unauthorized');

    if (currentUser) {
      if (isUnauthorizedRoute) {
        return paths.main;
      }

      return null;
    }

    if (!currentUser) {
      if(!isUnauthorizedRoute) {
        return paths.login;
      }
    }

    return null;
  }

  return {
    getRedirectPath,
  }
}