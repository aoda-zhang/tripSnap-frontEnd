import { ThemeProvider } from '@mui/material';
import '@shared/assets/styles/global.css';
import MUITheme from '@shared/assets/styles/MUI-theme';
import ErrorPage from '@shared/components/Error';
import SuspenseFallback from '@shared/components/SuspenseFeedback';
import getReactQueryOptions from '@shared/cores/react-query';
import { ReactNode, Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import envConfig, { EnvVariables } from '../config';

import AppRouterProvider from './routes';

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(() => {
    return new QueryClient(getReactQueryOptions(envConfig));
  });
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
            <AppRouterProvider />
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export default AppProvider;
