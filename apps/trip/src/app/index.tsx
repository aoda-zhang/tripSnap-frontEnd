import '@shared/assets/theme/global.css';
import { FC } from 'react';

import AppProvider from './appProvider';
import AppRouterProvider from './routes';

const App: FC = () => {
  return (
    <AppProvider>
      <AppRouterProvider />
    </AppProvider>
  );
};

export default App;
