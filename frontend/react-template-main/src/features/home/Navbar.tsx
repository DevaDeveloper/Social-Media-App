/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, useState } from 'react';
import { Add, Logout } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import LOGO from '../../assets/logo.png';
import styles from './Navbar.module.scss';
// import { useAppDispatch } from '../../store/hooks';
// import { logoutUser } from '../login/loginSlice';
import Modal from '../../components/modal/Modal';

const Navbar: FC = () => {
  const [modal, setModal] = useState(false);
  // const dispatch = useAppDispatch();
  const history = useHistory();

  const handleClick = () => {
    history.push('/new-post');
  };

  const handleOpenModal = () => {
    setModal(true);
  };
  const handleCloseModal = () => {
    setModal(false);
  };
  const handleToHomePage = () => {
    history.push('./user-posts');
  };

  return (
    <>
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
          <button type="button" onClick={handleOpenModal}>
            <Logout />
            Log Out
          </button>
        </div>
      </nav>
      {modal && <Modal handleCloseModal={handleCloseModal} />}
    </>
  );
};
export default Navbar;
