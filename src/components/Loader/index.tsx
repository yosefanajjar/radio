import React from 'react';

import styles from './styles.module.css';

export const Loader = (
  props: React.HTMLAttributes<HTMLDivElement>,
) => {
  return <div className={styles.loader} {...props}></div>;
};
