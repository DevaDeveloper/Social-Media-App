import React, { FC } from 'react';
import { Add, Logout } from '@mui/icons-material';

import LOGO from '../../assets/logo.png';
import styles from './Navbar.module.scss';

const Navbar: FC = () => (
  <nav>
    <img src={LOGO} alt="LOGO IMG" />
    <div className={styles.navBtns}>
      <button type="button">
        <Add />
        Add New
      </button>
      <button type="button">
        <Logout />
        Log Out
      </button>
    </div>
  </nav>
);
export default Navbar;
