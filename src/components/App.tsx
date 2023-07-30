import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import BookingPage from './pages/BookingPage/BookingPage';
import MainPage from './pages/MainPage/MainPage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import TripPage from './pages/TripPage/TripPage';
import Layout from './hoc/Layout/Layout';
import AppRouter from '../enums/routes/AppRouter';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../store/types/types';
import { authActionCreator } from '../store/action';

function App() {
  const dispatch = useDispatch() as AppDispatch;

  useEffect(() => {
    dispatch(authActionCreator.reSignIn());
  }, [dispatch]);

  const isSigned = useAppSelector(state => state.auth.user);

  const signed = () => {
    return (
      <>
        <Route index element={<MainPage />} />
        <Route path={AppRouter.TRIP} element={<TripPage />}>
          <Route path={AppRouter.TRIP_ID} element={<TripPage />} />
        </Route>
        <Route path={AppRouter.BOOKINGS} element={<BookingPage />} />
        <Route
          path={AppRouter.ANY}
          element={<Navigate to={AppRouter.ROOT} replace />}
        />
      </>
    );
  };

  const notSigned = () => {
    return (
      <>
        <Route path={AppRouter.SIGN_UP} element={<SignUpPage />} />
        <Route path={AppRouter.SIGN_IN} element={<SignInPage />} />
        <Route
          path={AppRouter.ROOT}
          element={<Navigate to={AppRouter.SIGN_IN} replace />}
        />
        <Route
          path={AppRouter.ANY}
          element={<Navigate to={AppRouter.SIGN_IN} replace />}
        />
      </>
    );
  };

  return (
    <Routes>
      <Route path={AppRouter.ROOT} element={<Layout />}>
        {isSigned ? signed() : notSigned()}
      </Route>
    </Routes>
  );
}

export default App;
