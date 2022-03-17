import React, { FC } from 'react';
import { Add, Logout } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import LOGO from '../../assets/logo.png';
import styles from './Navbar.module.scss';

const Navbar: FC = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/new-post');
  };
  return (
    <nav>
      <img src={LOGO} alt="LOGO IMG" />
      <div className={styles.navBtns}>
        <button type="button" onClick={handleClick}>
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
};
export default Navbar;
