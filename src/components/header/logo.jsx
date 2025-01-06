import React from "react";
import styles from "../../scss/css/logo.module.css";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <span className={styles.text}>Club</span>{" "}
      <span className={styles.number}>369</span>
    </div>
  );
};

export default Logo;
