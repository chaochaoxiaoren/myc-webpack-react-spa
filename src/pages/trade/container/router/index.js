import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Index from '@trade/views/Index/index';
import ErrorPage from '@trade/components/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/trade',
    element: <Index />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
