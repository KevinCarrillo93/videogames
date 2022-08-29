import styles from './PageError.module.css'
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function PageError() {
    const history = useHistory();
  return (
    <div className={styles.body}>
      <h1 className={styles.h1}>404</h1>
      <div className={styles.cloak__wrapper}>
        <div className={styles.cloak__container}>
          <div className={styles.cloak}></div>
        </div>
      </div>
      <div className={styles.info}>
        <h2>We can't find that page</h2>
        <p className={styles.p}>
          We're fairly sure that page used to be here, but seems to have gone
          missing. We do apologise on it's behalf.
        </p>
        <button className={styles.homeButton} onClick={()=>history.push('./')}>Home</button>
      </div>
    </div>
  );
}
