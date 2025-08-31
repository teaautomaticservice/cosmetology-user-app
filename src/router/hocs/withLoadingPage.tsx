import { useEffect } from 'react';
import { EmptyLoader } from '@components/domain/emptyLoader/EmptyLoader';
import { useRedirect } from '@hooks/useRedirect';
import { useAppConfigStore } from '@stores/appConfig';
import { Navigate } from 'react-router-dom';

export const withLoadingPage = (Component: React.FC): React.FC => () => {
  const { getRedirectPath } = useRedirect();
  const { getAppConfigFromApi, isAppConfigLoaded, currentUser } = useAppConfigStore();

  useEffect(() => {
    getAppConfigFromApi();
  }, []);

  if (!isAppConfigLoaded && !currentUser) {
    return (
      <EmptyLoader />
    )
  }

  const path = getRedirectPath()

  if (!path) {
    return <Component />;
  }

  return <Navigate to={path} replace />;
}