import React from 'react';
import  style from '../user/Loader.module.css'; 

 export default function Loader () {
  return (
    <div className={style.loader}>
      <div className={style.spinner}></div>
    </div>
  );
};

