import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './app/App';
import { AuthProvider } from './app/providers/AuthProvider';
import { MerchantProvider } from './app/providers/MerchantProvider';
import { NavigationProvider } from './app/providers/NavigationProvider';
import { SideBarToggleProvider } from './app/providers/SideBarToggleProvider';

import 'react-perfect-scrollbar/dist/css/styles.css';
import './styles/index.scss';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MerchantProvider>
          <NavigationProvider>
            <SideBarToggleProvider>
              <App />
            </SideBarToggleProvider>
          </NavigationProvider>
        </MerchantProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
