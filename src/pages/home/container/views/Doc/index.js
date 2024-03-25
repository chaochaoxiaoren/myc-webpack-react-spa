import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const Index = () => {
  console.log('home');

  return (
    <>
      <Link to="/home">home</Link>
    </>
  );
};

export default observer(Index);
