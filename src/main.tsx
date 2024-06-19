import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { DataProvider } from '../src/services/context/DataContext.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <App />
      </DataProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
