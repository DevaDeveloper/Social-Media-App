import React from 'react';
import TextField from '@mui/material/TextField';
import styles from './LoginPage.module.scss';
import Logo from '../../assets/logo.png';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getPassword, getUsername, clearInputs } from './loginSlice';
// import { makeStyles } from '@mui/material';

// const useStyles = makeStyles({
//   inputs: {
//     color: 'white',
//   },
// });

// components needs style refactoring(mui..)
const allInputLabelColors = {
  style: { color: '#fff' },
};

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const stateUsername = useAppSelector((state) => state.login.username);
  const statePassword = useAppSelector((state) => state.login.password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stateUsername.trim().length === 0 || statePassword.trim().length < 8) {
      console.error('username or password too short');
    } else {
      console.log(stateUsername, statePassword);
      dispatch(clearInputs());
    }
  };

  return (
    <div className={styles.loginHolder}>
      <div className={styles.logHolder}>
        <div className={styles.loginLogoImg}>
          <img src={Logo} alt="LogoImg" />
        </div>
        <div>
          <h1>
            Log in to your account
            <span>.</span>
          </h1>

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
                type="password"
                label="Password"
                variant="standard"
                value={statePassword}
                InputLabelProps={allInputLabelColors}
                onChange={(e) => dispatch(getPassword(e.target.value))}
                required
                style={{ borderBottom: '1px solid #fff', margin: '18px 0' }}
              />
            </div>
            <div className={styles.forgotPass}>
              <p>Forgot password?</p>
            </div>
            <button type="submit">Log in</button>
            <hr style={{ width: '100%' }} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
