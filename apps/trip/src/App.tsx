import '@/shared/assets/styles/default.css';
import '@/shared/assets/styles/global.css';
import { FC, Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RouterProvider } from 'react-router-dom';

import envConfig from './config';
import routes from './routes';

import ErrorPage from '@/shared/components/Error';

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
    });
  }, []);
  return (
    <Suspense fallback={<>Loading...</>}>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <QueryClientProvider client={queryClient}>
          {import.meta.env.MODE !== 'prod' && (
            <ReactQueryDevtools initialIsOpen />
          )}
          <RouterProvider router={routes} />
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export default App;
