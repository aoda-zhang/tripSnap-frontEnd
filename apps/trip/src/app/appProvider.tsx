import { ThemeProvider } from '@mui/material';
import '@shared/assets/theme/global.css';
import MUITheme from '@shared/assets/theme/MUI-theme';
import Loading from '@shared/components/Loading';
import ErrorPage from '@shared/components/SystemError';
import getReactQueryOptions from '@shared/cores/react-query';
import { ReactNode, Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import initializeThemeClass from '../../../../packages/assets/theme/initializeThemeClass';
import envConfig, { EnvVariables } from '../config';
import '@shared/i18n';

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(() => {
    return new QueryClient(getReactQueryOptions(envConfig));
  });
  useEffect(() => {
    initializeThemeClass();
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <QueryClientProvider client={queryClient}>
          {envConfig?.env !== EnvVariables.prod && (
            <ReactQueryDevtools initialIsOpen />
          )}
          <ThemeProvider theme={MUITheme}>
            <Toaster />
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export default AppProvider;
