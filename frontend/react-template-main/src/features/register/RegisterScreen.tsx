import React, { FC } from 'react';
import { TextField, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import styles from './RegisterScreen.module.scss';
import Logo from '../../assets/logo.png';
import {
  registerConfirmPassword,
  registerEmail,
  registerFirstname,
  registerLastname,
  registerPassword,
  registerUsername,
  registerDate,
  registerRole,
  clearForm,
} from './registerSlice';

// label colors
const allInputLabelColors = {
  style: { color: '#fff' },
};

const RegisterScreen: FC = () => {
  const dispatch = useAppDispatch();
  const stateFirstName = useAppSelector((state) => state.register.firstName);
  const stateLastName = useAppSelector((state) => state.register.lastName);
  const stateUserName = useAppSelector((state) => state.register.userName);
  const stateEmail = useAppSelector((state) => state.register.email);
  const statePassword = useAppSelector((state) => state.register.password);
  const stateDate = useAppSelector((state) => state.register.date);
  const stateConfirmPassword = useAppSelector(
    (state) => state.register.confirmPassword,
  );
  const stateRole = useAppSelector((state) => state.register.role);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(
      stateFirstName,
      stateLastName,
      stateUserName,
      stateEmail,
      statePassword,
      stateConfirmPassword,
      stateDate,
      stateRole,
    );
    dispatch(clearForm());
  };

  return (
    <div className={styles.registerHolder}>
      <div className={styles.loginLogoImg}>
        <img src={Logo} alt="LogoImg" />
      </div>
      <div className={styles.logHolder}>
        <h1>
          Create new account
          <span>.</span>
        </h1>

        {/* FORM */}
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className={styles.registerNames}>
            <div className={styles.usernameLoginInput}>
              <TextField
                placeholder="First Name"
                id="firstname_input"
                variant="standard"
                label="First Name"
                color="primary"
                type="text"
                value={stateFirstName}
                InputLabelProps={allInputLabelColors}
                onChange={(e) => dispatch(registerFirstname(e.target.value))}
                required
                sx={{
                  borderBottom: '1px solid #fff',
                  width: '100%',
                }}
              />
            </div>
            <div className={styles.passwordLoginInput}>
              <TextField
                placeholder="Last Name"
                id="lastname_input"
                type="text"
                label="Last Name"
                variant="standard"
                value={stateLastName}
                InputLabelProps={allInputLabelColors}
                onChange={(e) => dispatch(registerLastname(e.target.value))}
                required
                sx={{
                  borderBottom: '1px solid #fff',
                  width: '100%',
                  margin: '5px 0',
                }}
              />
            </div>
          </div>
          <TextField
            placeholder="Username"
            id="username_input"
            variant="standard"
            label="Username"
            color="primary"
            type="text"
            value={stateUserName}
            InputLabelProps={allInputLabelColors}
            onChange={(e) => dispatch(registerUsername(e.target.value))}
            required
            sx={{
              borderBottom: '1px solid #fff',
              width: '100%',
              margin: '5px 0',
            }}
          />
          <TextField
            placeholder="E-mail"
            id="email_input"
            variant="standard"
            label="Email"
            color="primary"
            type="email"
            value={stateEmail}
            InputLabelProps={allInputLabelColors}
            onChange={(e) => dispatch(registerEmail(e.target.value))}
            required
            sx={{
              borderBottom: '1px solid #fff',
              width: '100%',
              margin: '5px 0',
            }}
          />
          <TextField
            placeholder="Password"
            id="password_input"
            type="password"
            label="Password"
            variant="standard"
            value={statePassword}
            InputLabelProps={allInputLabelColors}
            onChange={(e) => dispatch(registerPassword(e.target.value))}
            required
            sx={{
              borderBottom: '1px solid #fff',
              width: '100%',
              margin: '5px 0',
            }}
          />
          <TextField
            placeholder="Confirm Password"
            id="confirm_input"
            type="password"
            label="Confirm Password"
            variant="standard"
            value={stateConfirmPassword}
            InputLabelProps={allInputLabelColors}
            onChange={(e) => dispatch(registerConfirmPassword(e.target.value))}
            required
            sx={{ borderBottom: '1px solid #fff' }}
          />
          <div className={styles.dates}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="date">Date of birth</label>
            <input
              type="date"
              id="date"
              name="date"
              value={stateDate}
              onChange={(e) => dispatch(registerDate(e.target.value))}
              required
            />
          </div>
          <RadioGroup
            className={styles.radios}
            onChange={(e) => dispatch(registerRole(e.target.value))}
          >
            <FormControlLabel
              control={<Radio />}
              value="user"
              label="User"
              className={styles.userRadio}
            />
            <FormControlLabel control={<Radio />} value="admin" label="Admin" />
          </RadioGroup>

          <button type="submit">Log in</button>
          <hr />
          <div className={styles.logAcc}>
            <p>
              Already have account?
              <span>Login!</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
