import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Loading from '@home/components/Loading/index.jsx';

const Dialog = React.lazy(() => import(/* webpackChunkName: "Dialog" */ "@home/components/Dialog"))

const Index = () => {
  console.log('home');

  return (
    <>
      <Link to="/home">home</Link>
      <Suspense fallback={<Loading />}>
        <Dialog />
      </Suspense>
    </>
  );
};

export default observer(Index);
