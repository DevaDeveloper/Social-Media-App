import React from 'react';
// import { useTranslation } from 'react-i18next';
import './App.css';
import Routes from './routes/Routes';

function App() {
  // const { i18n, t } = useTranslation();

  // const changeLanguage = (test: string) => {
  //   i18n.changeLanguage(test).then(() => {});
  // };

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
