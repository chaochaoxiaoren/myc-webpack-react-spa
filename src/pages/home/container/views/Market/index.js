import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import useStore from '@home/hooks/useStore';
import style from './index.module.css';
import Loading from '@home/components/Loading/index.jsx';

const Index = () => {
  const { countStore } = useStore();
  const { count, computedCount, increment, decrement, reset } = countStore;

  const params = useParams();
  const { id } = params;
  console.log('params:', id)
  const [searchParams] = useSearchParams();
  console.log('query:', searchParams.get("aa"))

  return (
    <>
      <Link to="/home">首页</Link> <br />
      <div className={style.body}>
        组件样式
      </div>
      <Loading />
      {count}
      <br />
      {computedCount}
      <br />
      <button
        onClick={() => {
          increment();
        }}
      >
        加一
      </button>
      <button onClick={decrement}>减一</button>
      <button
        onClick={() => {
          reset();
        }}
      >
        重置
      </button>
    </>
  );
};

export default observer(Index);
