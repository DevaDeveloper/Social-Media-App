import React, { FC, useState, useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';
import { TextField, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
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
  signUpAsync,
  clearLoadingState,
} from './registerSlice';

// label colors
const allInputLabelColors = {
  style: { color: '#fff' },
};

const RegisterScreen: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  // Handle SIGNUP validation
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [emailError, setEmailError] = useState<boolean>(false);

  const [confirmErrorMessage] = useState<string>('Passwords do not match!');
  const [errorMessages] = useState<string>(`Password must 
      contain at least 8 characters
      one uppercase letter, lowercase letter, special character,
      shorter than 20 characters!`);
  const [emailErrorMessage] = useState<string>('Not a valid email!');

  // State from Slice
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
  const users = useAppSelector((state) => state.register.users);
  const { errMessage, loading } = useAppSelector((state) => state.register);

  useEffect(() => {
    dispatch(clearForm());
    dispatch(clearLoadingState());
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setPasswordError(false);
    setConfirmPasswordError(false);

    if (statePassword !== stateConfirmPassword) {
      setConfirmPasswordError(true);
    } else if (
      // eslint-disable-next-line operator-linebreak
      statePassword.trim().length < 8 ||
      statePassword.trim().length > 20
    ) {
      setPasswordError(true);
    } else if (stateEmail.includes('.') === false) {
      setEmailError(true);
    } else {
      dispatch(
        signUpAsync({
          firstName: stateFirstName,
          lastName: stateLastName,
          username: stateUserName,
          email: stateEmail,
          dateOfBirth: stateDate,
          userType: stateRole,
          password: statePassword,
        }),
      )
        .then(unwrapResult)
        .then(() => dispatch(clearForm()))
        .catch((error) => console.error(error));
    }
  };

  // Redirect to Login page if user has no account
  const handleHasAccountLogin = () => {
    history.push('/login');
  };
  console.log(users);
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

        {/* // error handling message */}
        {loading === 'rejected' && (
          <h1
            style={{
              color: 'red',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
            }}
          >
            {errMessage}
            <ErrorIcon sx={{ fontSize: '2.0rem', color: 'red' }} />
          </h1>
        )}

        {loading === 'fulfilled' && (
          <h1
            style={{
              color: '#00B960',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
            }}
          >
            Successefully created account!
            <CheckCircleIcon sx={{ fontSize: '2.0rem', color: '#00B960' }} />
          </h1>
        )}

        {/* FORM */}
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className={styles.registerNames}>
            <div className={styles.usernameLoginInput}>
              {/* FIRST NAME INPUT */}
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
              {/* LAST NAME INPUT */}
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

          {/* USERNAME INPUT */}
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

          {/* EMAIL */}
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
            error={emailError}
            helperText={emailError ? emailErrorMessage : ''}
            sx={{
              borderBottom: '1px solid #fff',
              width: '100%',
              margin: '5px 0',
            }}
          />
          {/* PASSWORD INPUT */}
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
            error={passwordError}
            helperText={passwordError ? errorMessages : ''}
            sx={{
              borderBottom: '1px solid #fff',
              width: '100%',
              margin: '5px 0',
            }}
          />

          {/* CONFIRM PASSWORD */}
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
            error={confirmPasswordError}
            sx={{ borderBottom: '1px solid #fff' }}
            helperText={confirmPasswordError ? confirmErrorMessage : ''}
          />

          {/* DATE OF BIRTH INPUT */}
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

          {/* SECELT ADMIN OR USER INPUT */}
          <RadioGroup
            className={styles.radios}
            onChange={(e) => dispatch(registerRole(e.target.value))}
          >
            <FormControlLabel
              control={<Radio />}
              value="USER"
              label="User"
              className={styles.userRadio}
            />
            <FormControlLabel control={<Radio />} value="ADMIN" label="Admin" />
          </RadioGroup>

          <button type="submit">Log in</button>
          <hr />

          <div className={styles.logAcc}>
            <p>
              Already have account?
              <button type="button" onClick={handleHasAccountLogin}>
                Login!
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
