import React, { Suspense } from 'react';
import style from './index.module.css';
import { add } from '@home/utils';
import { DatePicker } from 'antd';
import ErrorBoundary from '@home/components/ErrorBoundary';
import TestError from '@home/components/TestError';
import TestErrorPromise from '@home/components/TestErrorPromise';

interface User {
  name: string,
  age: number
}

const Demo = () => {

  console.log(add(1, 2));
  console.log('sss');

  const user = {
    name: '张三',
    age: 10
  };

  const combine = (user: User) => {
    return user.name+user.age
  }

  return <div className={style.container}>
    <div className={style.userName}>{combine(user)}</div>
    <DatePicker />
    {/* ErrorBoundary 是捕获throw抛出的Error  */}
    <ErrorBoundary>
      <TestError />
    </ErrorBoundary>
    {/* Suspense 是捕获throw抛出的Promise  */}
    <Suspense fallback={<div>12345678</div>}>
      <TestErrorPromise />
    </Suspense>
  </div>;
};

export default Demo;
