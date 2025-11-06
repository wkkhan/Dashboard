import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './app/App';
import { AuthProvider } from './app/providers/AuthProvider';
import { MerchantProvider } from './app/providers/MerchantProvider';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/bootstrap-overrides.css';
import './styles/globals.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MerchantProvider>
          <App />
        </MerchantProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
