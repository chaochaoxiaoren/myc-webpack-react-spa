import React from "react";
import style from './index.module.scss';
import './index.scss';
import cl from "classnames";

const Sass = () => {
  return <div className={cl('sass', style.container)}>Less</div>
}

export default Sass;
