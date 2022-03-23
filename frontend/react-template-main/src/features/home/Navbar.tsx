/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC } from 'react';
import { Add, Logout } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import LOGO from '../../assets/logo.png';
import styles from './Navbar.module.scss';
import { useAppDispatch } from '../../store/hooks';
import { logoutUser } from '../login/loginSlice';

const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleClick = () => {
    history.push('/new-post');
  };

  const handleToHomePage = () => {
    history.push('./user-posts');
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push('/login');
  };

  return (
    <nav>
      <div
        role="presentation"
        onClick={handleToHomePage}
        style={{ cursor: 'pointer' }}
      >
        <img src={LOGO} alt="LOGO IMG" />
      </div>
      <div className={styles.navBtns}>
        <button type="button" onClick={handleClick}>
          <Add />
          Add New
        </button>
        <button type="button" onClick={handleLogout}>
          <Logout />
          Log Out
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
