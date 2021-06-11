import React from 'react';

import styles from './styles.module.css';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode | React.ReactNode[];
}

export const IconButton = ({ children, ...props }: Props) => {
  return (
    <button className={styles.iconButton} {...props}>
      {children}
    </button>
  );
};
