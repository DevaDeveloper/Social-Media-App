/* eslint-disable no-console */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { unwrapResult } from '@reduxjs/toolkit';
import styles from './LoginPage.module.scss';
import Logo from '../../assets/logo.png';
import LoginModal from '../../components/loginModal/LoginModal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getPassword,
  getUsername,
  clearInputs,
  userLoginAndTokens,
  // userTokens,
} from './loginSlice';

// components needs style refactoring(mui..)
const allInputLabelColors = {
  style: { color: '#fff' },
};

const LoginPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const stateUsername = useAppSelector((state) => state.login.username);
  const statePassword = useAppSelector((state) => state.login.password);
  const { loading, currentUser, errMessage } = useAppSelector(
    (state) => state.login,
  );
  // const errorMessage = useAppSelector((state) => state.login.errMessage);

  const [loginError, setLoginError] = useState<boolean>(false);
  const [loginErrorMessage] = useState<string>(
    'Password or username is not valid!',
  );
  const [modal, setModal] = useState<boolean>(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  if (modal) {
    console.log(errMessage);
  }
  const handleCloseModal = () => {
    setModal(false);
  };

  const handleShowPassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stateUsername.trim().length === 0 || statePassword.trim().length < 8) {
      setLoginError(true);
    } else {
      dispatch(
        userLoginAndTokens({
          email: stateUsername,
          password: statePassword,
        }),
      )
        .then(unwrapResult)
        .then(() => {
          console.log(currentUser.userType);
          history.push('/user-posts');
          dispatch(clearInputs());
        })
        .catch(() => {
          setModal(true);
        });
    }
  };
  const handleRegisterAccount = () => {
    history.push('/register');
  };

  return (
    <div className={styles.loginHolder}>
      {modal && (
        <LoginModal text={errMessage} handleCloseModal={handleCloseModal} />
      )}
      <div className={styles.logHolder}>
        <div className={styles.loginLogoImg}>
          <img src={Logo} alt="LogoImg" />
        </div>
        <div>
          <h1>
            Log in to your account
            <span>.</span>
          </h1>
          {loading === 'pending' && (
            <h1
              style={{
                color: '#00B960',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              LOGGING IN...
              <HourglassEmptyIcon sx={{ fontSize: '3.0rem' }} />
            </h1>
          )}
          {/* FORM */}
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className={styles.usernameLoginInput}>
              <TextField
                placeholder="Username"
                id="username_input"
                variant="standard"
                label="Username"
                color="primary"
                type="text"
                value={stateUsername}
                onChange={(e) => dispatch(getUsername(e.target.value))}
                required
                InputLabelProps={allInputLabelColors}
                sx={{
                  background: 'pallet.primary.main',
                  borderBottom: '1px solid #fff',
                }}
              />
            </div>
            <div className={styles.passwordLoginInput}>
              <TextField
                placeholder="Password"
                id="password_input"
                type={visiblePassword ? 'text' : 'password'}
                label="Password"
                variant="standard"
                value={statePassword}
                InputLabelProps={allInputLabelColors}
                onChange={(e) => dispatch(getPassword(e.target.value))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{ backgroundColor: 'transparent' }}
                    >
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        sx={{
                          width: '5px',
                          color: '#fff',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '16px',
                          margin: '10px 0',
                          transition: 'ease 0.4s all',
                        }}
                      >
                        {visiblePassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={loginError}
                helperText={loginError && loginErrorMessage}
                required
                sx={{ borderBottom: '1px solid #fff', margin: '18px 0' }}
              />
            </div>
            <div className={styles.forgotPass}>
              <p>Forgot password?</p>
            </div>
            <button type="submit" className={styles.loginBtn}>
              Log in
            </button>
            <hr style={{ width: '100%' }} />
            <div className={styles.registerAcc}>
              <p>
                Do not have an account?
                <button type="button" onClick={handleRegisterAccount}>
                  Register!
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
