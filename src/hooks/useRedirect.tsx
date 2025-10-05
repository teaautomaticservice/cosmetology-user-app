import { paths } from '@router/paths';
import { routerConfig } from '@router/routerConfig';
import { RouterRoleEnum } from '@router/types';
import { useAppConfigStore } from '@stores/appConfig';
import { UserStatusEnum } from '@typings/api/users';
import { generatePath, useLocation, useParams } from 'react-router-dom';

export const useRedirect = () => {
  const { pathname } = useLocation();
  const { currentUser } = useAppConfigStore();
  const params = useParams();

  const getRedirectPath = (): string | null => {
    const currentConfig = routerConfig.find(({ path }) => {
      try {
        const finalPath = generatePath(path, params);
        return finalPath === pathname;
      } catch {
        return false;
      }
    });

    if (
      !currentConfig?.roles ||
      currentConfig.roles.includes(RouterRoleEnum.ALL)
    ) {
      return null;
    }

    const { roles } = currentConfig;
    const isUnauthorizedRoute = roles.includes('unauthorized');
    const isAuthorizedRoute = !isUnauthorizedRoute;
    const isPendingRoute = roles.includes('pending');

    const checkIsPending = () => {
      if (isPendingRoute && !currentUser) {
        return true;
      }

      return isPendingRoute && currentUser?.status === UserStatusEnum.PENDING;
    };

    if (isUnauthorizedRoute) {
      if (!currentUser) {
        return null;
      }

      if (checkIsPending()) {
        return null;
      } else {
        return paths.main;
      }
    }

    if (checkIsPending()) {
      return null;
    }

    if (isAuthorizedRoute) {
      if (!currentUser) {
        return paths.login;
      }

      if (currentUser.status === UserStatusEnum.PENDING) {
        return paths.completeRegistration;
      }

      return null;
    }

    return null;
  };

  return {
    getRedirectPath,
  };
};
