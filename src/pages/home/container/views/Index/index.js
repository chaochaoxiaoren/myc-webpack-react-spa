import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import useStore from '@home/hooks/useStore';
import style from './index.module.css';
import Loading from '@home/components/Loading/index.jsx';
import bgImage from '@/assets/bg.png';
import json from '@/assets/data.json';

// 适合于文件或者对象动态加载
import(/* webpackChunkName: "Tooltip" */ '@home/components/Tooltip').then(() => {
  console.log('done');
}).catch(() => {
  console.log('error');
})

const Index = () => {
  const navigate = useNavigate();
  console.log('home');
  console.log('json', json);
  const { countStore } = useStore();
  const { count, computedCount, increment, decrement, reset } = countStore;

  return (
    <>
      <Link to="/home/market">market</Link> <br />
      <Link to="/home/doc">Doc</Link> <br />
      <Link to="/home/demo">Demo</Link> <br />
      <Link to="/home/less">Less</Link> <br />
      <Link to="/home/sass">Sass</Link> <br />
      <button
        onClick={() => {
          navigate('/home/market');
        }}
      >
        跳转market
      </button>
      <button
        onClick={() => {
          navigate('/home/market/1');
        }}
      >
        params按钮测试
      </button>
      <button
        onClick={() => {
          navigate('/home/market?aa=22');
        }}
      >
        query按钮测试
      </button>
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
      ============================================================
      <br />
      <Outlet />
      <img src={bgImage} />
    </>
  );
};

export default observer(Index);
