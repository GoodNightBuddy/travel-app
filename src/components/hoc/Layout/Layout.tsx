import heartIcon from '../../../images/heart.svg';
import { Link, Outlet, useMatch } from 'react-router-dom';
import './styles.scss';
import HeaderNav from '../../common/HeaderNav/HeaderNav';

const Layout: React.FC = () => {
  const signInMatch = useMatch('sign-in');
  const signUpMatch = useMatch('sign-up');
  const displayNav = !signInMatch && !signUpMatch

  return (
    <div className="layout">
      <header className="header">
        <div className="header__inner">
          <Link to={'/'} className="header__logo" data-test-id="header-logo">
            Travel App
          </Link>
          {displayNav && <HeaderNav />}
        </div>
      </header>
      <div className="layout-main">
        <Outlet />
      </div>
      <footer className="footer">
        <span className="footer__text">
          from{' '}
          <a className="footer__link" href="https://binary-studio.com">
            binary studio
          </a>{' '}
          with
          <img className="footer__icon" src={heartIcon} alt="heart icon" />
        </span>
      </footer>
    </div>
  );
};

export default Layout;
