import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

// 1. Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Provide the client */}
    <QueryClientProvider client={queryClient}>
      <BrowserRouter  basename="/x-clone">
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

