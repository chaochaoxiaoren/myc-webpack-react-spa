import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Index from '@home/views/Index/index';
import Market from '@home/views/Market/index';
import Doc from '@home/views/Doc/index';
import Demo from '@home/views/Demo/index';
import Less from '@home/views/Less';
import Sass from '@home/views/Sass';
import ErrorPage from '@home/components/ErrorPage';

// router 思路：
// 同一层级的路由必须指定完整路径，会改变url，同时会打开新页面
// 子路由是内嵌到页面中的部分，使用Outlet接收，会改变url，会修改页面部分展示
// 跟vue-router的概念基本一致

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Index />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'doc',
        element: <Doc />,
        errorElement: <ErrorPage />,
      },
    ]
  },
  {
    path: '/home/market',
    element: <Market />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home/demo',
    element: <Demo />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home/less',
    element: <Less />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home/sass',
    element: <Sass />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home/market/:id',
    element: <Market />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
