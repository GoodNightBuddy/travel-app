import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { authActionCreator } from '../../../store/action';
import { AppDispatch, useAppSelector } from '../../../store/types/types';
import { Loader } from '../../common/Loader/Loader';
import './styles.scss';
import AppRouter from '../../../enums/routes/AppRouter';
import { toast } from 'react-toastify';

const SignInPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const isLoading = useAppSelector(state => state.auth.loading);

  const dispatch = useDispatch() as AppDispatch;
  const handeSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    try {
      await dispatch(authActionCreator.signIn(user));
    } catch (error) {
      toast.error((error as Error).message, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="sign-in-page">
      <h1 className="visually-hidden">Travel App</h1>
      <form className="sign-in-form" autoComplete="off" onSubmit={handeSubmit}>
        <h2 className="sign-in-form__title">Sign In</h2>
        <label className="trip-popup__input input">
          <span className="input__heading">Email</span>
          <input
            name="email"
            type="email"
            required
            data-test-id="auth-email"
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label className="trip-popup__input input">
          <span className="input__heading">Password</span>
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={3}
            required
            data-test-id="auth-password"
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button className="button" type="submit" data-test-id="auth-submit">
          Sign In
        </button>
      </form>
      <span>
        Don't have an account?
        <Link
          to={AppRouter.SIGN_UP}
          className="sign-in-form__link"
          data-test-id="auth-sign-up-link"
        >
          Sign Up
        </Link>
      </span>
    </main>
  );
};

export default SignInPage;
