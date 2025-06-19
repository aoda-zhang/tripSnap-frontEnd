import { ThemeProvider } from '@mui/material';
import '@shared/assets/theme/global.css';
import initializeThemeClass from '@shared/assets/theme/initializeThemeClass';
import MUITheme from '@shared/assets/theme/MUI-theme';
import ErrorPage from '@shared/components/Error';
import SuspenseFallback from '@shared/components/SuspenseFeedback';
import getReactQueryOptions from '@shared/cores/react-query';
import { ReactNode, Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import envConfig, { EnvVariables } from '../config';
import '../i18n';

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
    <Suspense fallback={<SuspenseFallback />}>
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
