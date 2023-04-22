import 'react-toastify/dist/ReactToastify.css';
import '../content/app.scss';
import 'app/config/dayjs.ts';

import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ErrorBoundary from './shared/error/error-boundary';
import AppRoutes from './routes';
import Header from './shared/layout/header/header';
import { useAppDispatch, useAppSelector } from 'app/config/store';


const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

export const App = () => {

  const currentLocale = useAppSelector(state => state.locale.currentLocale);

  useEffect(() => { }, []);

  return (
    <BrowserRouter basename={baseHref}>
      <div className="app-container">
        <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />
        <ErrorBoundary>
          <Header
            currentLocale={currentLocale}
          />
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
          {/* <Footer /> */}
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
