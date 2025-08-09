import storageKeys from '@shared/constants/storageKeys';
import storageTool from '@shared/utils/storage';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import routeKeys from '@/constants/routeKeys';

interface GuardRouteProps {
  isRequireUserLogin?: boolean;
  children: ReactNode;
}
const GuardRoute = (props: GuardRouteProps) => {
  const { isRequireUserLogin = true, children } = props;
  const navigate = useNavigate();
  useEffect(() => {
    // Default to ask user login if not specified
    if (isRequireUserLogin) {
      const isUserLogged = storageTool.get(storageKeys.accessToken);
      if (!isUserLogged) {
        navigate(routeKeys.login);
      }
    }
  }, [isRequireUserLogin, navigate]);
  return <div>{children}</div>;
};

export default GuardRoute;
