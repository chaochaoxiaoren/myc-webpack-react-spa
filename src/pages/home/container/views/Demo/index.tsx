import React from 'react';
import style from './index.module.css';
import { add } from '@home/utils/index.ts';

interface User {
  name: string,
  age: number
}

const Demo = () => {

  console.log(add(1, 2));

  const user = {
    name: '张三',
    age: 10
  };

  const combine = (user: User) => {
    return user.name+user.age
  }

  return <div className={style.container}>{combine(user)}</div>;
};

export default Demo;
