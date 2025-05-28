import '@shared/assets/styles/global.css';
import ErrorPage from '@shared/components/Error';
import SuspenseFallback from '@shared/components/SuspenceFallback';
import { FC, Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { toast, Toaster } from 'react-hot-toast';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RouterProvider } from 'react-router-dom';

import envConfig, { EnvVariables } from './config';
import routes from './routes';

const App: FC = () => {
  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnReconnect: envConfig?.queryOptions?.refetchOnReconnect,
          refetchOnWindowFocus: false,
          staleTime: 5 * 60 * 1000, // Fresh data for 5 minutes
          cacheTime: 30 * 60 * 1000, // Cache data for 30 minutes
          retry: 2, // Retry failed requests up to 2 times
        },
      },
      queryCache: new QueryCache({
        onError: (error, query) => {
          // Handle errors globally for queries
          if (query.state.data !== undefined) {
            toast.error(
              envConfig?.env === EnvVariables.prod
                ? envConfig?.systemSettings?.errorMessage
                : `Error: ${error instanceof Error ? error?.message : 'Unknown error'}`,
            );
          }
        },
      }),
    });
  }, []);
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          {envConfig?.env !== EnvVariables.prod && (
            <ReactQueryDevtools initialIsOpen />
          )}
          <RouterProvider router={routes} />
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export default App;
