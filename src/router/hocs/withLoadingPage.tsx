import { useRedirect } from '@hooks/useRedirect';
import { Navigate } from 'react-router-dom';

export const withLoadingPage = (Component: React.FC): React.FC => () => {
  const { getRedirectPath } = useRedirect();

  const path = getRedirectPath()

  if (!path) {
    return <Component />;
  }

  return <Navigate to={path} replace />;
}