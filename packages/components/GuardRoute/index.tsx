import { ReactNode, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import StorageKeys from '../../constants/storageKeys';
import storageTool from '../../utils/storage';
import Loading from '../Loading';

interface GuardRouteProps {
  isRequireUserLogin?: boolean;
  children: ReactNode;
}
const GuardRoute = (props: GuardRouteProps) => {
  const { isRequireUserLogin = true, children } = props;
  const navigate = useNavigate();
  useEffect(() => {
    // Default to aks user login if not specified
    if (isRequireUserLogin) {
      const isUserLogged = storageTool.get(StorageKeys.accessToken);
      if (!isUserLogged) {
        navigate('/login');
      }
    }
  }, [isRequireUserLogin, navigate]);
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default GuardRoute;
