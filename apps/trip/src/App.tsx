import '@/shared/assets/styles/default.css';
import '@/shared/assets/styles/global.css';
import { FC, Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import routes from './routes';

const App: FC = () => {
  return (
    // You can define a custom fallback UI here
    <Suspense fallback={<>Loading...</>}>
      <RouterProvider router={routes} />
    </Suspense>
  );
};

export default App;
