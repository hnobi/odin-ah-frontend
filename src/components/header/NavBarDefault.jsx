import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchDropDown from '../navbar/search/SearchDropDown';
import DropDown from '../inAppNotification/notification/dropDown';

const NavBarDefault = ({
  handleLogin, isDashboardActive, handleSignup, userIsAuthenticated, handleLogout,
}) => (
  <nav className="nav-bar">
    <div className="nav-bar__container">
      <Link to={'/'}>
        <div className="nav-bar__logo"/>
      </Link>
      <div className="nav-bar__menu--right">
        <div className='nav-search'>
           <SearchDropDown/>
        </div>
        {!userIsAuthenticated && (
          <React.Fragment>
            <div
              className="btn btn--link text--primary sign-in-btn sign-in-btn-js"
              onClick={handleLogin}
            >
              Sign In
            </div>
            <div className="btn btn--primary sign-up-btn-js" onClick={handleSignup}>
              Sign Up
            </div>
          </React.Fragment>
        )}
        {userIsAuthenticated && (
          <React.Fragment>
             <DropDown />
          { !isDashboardActive && (<Link
                className="btn btn--link text--primary sign-in-btn sign-in-btn-js"
                to="/dashboard"
              >
                Dashboard
              </Link>)}
            <div className="btn btn--primary sign-up-btn-js" onClick={handleLogout}>
              Log Out
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  </nav>
);

NavBarDefault.propTypes = {
  handleLogin: PropTypes.func,
  handleSignup: PropTypes.func,
  handleLogout: PropTypes.func,
  handleDashboardPage: PropTypes.func,
  userIsAuthenticated: PropTypes.bool,
  isDashboardActive: PropTypes.bool,
  isBookmarkActive: PropTypes.bool
};

export default NavBarDefault;
