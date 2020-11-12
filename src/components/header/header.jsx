import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {Path} from "../../const";
import {loadAuthStatus, loadAuthData} from "../../store/selectors";
import {AuthorizationStatus} from "../../const";

const Header = (props) => {
  const {authStatus, authData} = props;

  const isAuthStatus = authStatus === AuthorizationStatus.AUTH;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={isAuthStatus ? Path.MAIN : Path.LOGIN}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to={isAuthStatus ? Path.FAVORITES : Path.LOGIN}>
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                    {isAuthStatus ? <img src={authData.avatarUrl}/> : ``}
                  </div>
                  {isAuthStatus ? <span className="header__user-name user__name">{authData.email}</span> : <span className="header__login">Sign in</span>}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authStatus: PropTypes.string.isRequired,
  authData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authStatus: loadAuthStatus(state),
  authData: loadAuthData(state),
});

export {Header};
export default connect(mapStateToProps, null)(Header);
