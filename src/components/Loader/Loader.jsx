import React from "react";
import { InfinitySpin } from "react-loader-spinner"; 
import s from "./Loader.module.css"; 

const Loader = () => {
  return (
    <div className={s.container}>
      <InfinitySpin
        visible={true}
        width={80}
        color="#EF4444"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default Loader;
