/* eslint-disable no-console */
import axios from 'axios';
import React from 'react';
// import { useTranslation } from 'react-i18next';
import './App.css';
import Routes from './routes/Routes';
import { store } from './store/store';
import { setErrorMessage } from './features/login/loginSlice';
// import { useAppDispatch } from './store/hooks';

function App() {
  // const { i18n, t } = useTranslation();
  // const changeLanguage = (test: string) => {
  //   i18n.changeLanguage(test).then(() => {});
  // };

  const { dispatch } = store;

  axios.interceptors.response.use(undefined, (error) => {
    if (error.response.status === 400) {
      dispatch(setErrorMessage('E-mail or password not valid!'));
    } else if (error.response.status === 401) {
      dispatch(setErrorMessage(error.response.data.message));
    } else if (error.response.status === 403) {
      // const dispatch = useAppDispatch();
      console.log(error.response.data);
      dispatch(
        setErrorMessage('Sorry, your profile is blocked. Contact the admin'),
      );
    } else if (error.response.status === 500) {
      console.error(error.response.data.message);
    }
  });

  return (
    <>
      <Routes />
      {/* <div>
        <button
          type="button"
          className="drago"
          onClick={() => changeLanguage('de')}
        >
          de
        </button>
        <button type="button" onClick={() => changeLanguage('en')}>
          en
        </button>
        <button type="button" onClick={() => changeLanguage('sr')}>
          sr
        </button>
        {t('title')}
      </div> */}
    </>
  );
}

export default App;
