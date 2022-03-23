import React, { FC } from 'react';
import styles from './AddPostButton.module.scss';

const Button: FC = ({ children, onClick, style }: any) => (
  <button type="submit" onClick={onClick} className={styles.btn} style={style}>
    {children}
  </button>
);

export default Button;
