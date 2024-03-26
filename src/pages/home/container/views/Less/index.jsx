import React from "react";
import style from './index.module.less';
import './index.less';
import cl from "classnames";

const Less = () => {
  return <div className={cl('less', style.container)}>Less</div>
}

export default Less;
