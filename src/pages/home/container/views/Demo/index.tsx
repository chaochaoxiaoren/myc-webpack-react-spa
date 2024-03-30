import React from 'react';
import style from './index.module.css';
import { add } from '@home/utils/index.ts';
import { DatePicker } from 'antd';

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
  </div>;
};

export default Demo;
