import React from "react";
import PropTypes from 'prop-types';
import {Router as BrowserRouter, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main";
import Favorites from "../favorites/favorites";
import Offer from "../offer/offer";
import Login from "../login/login";
import {Path} from "../../const";
import {OfferPropTypes} from "../../propTypes";
import {offersSelector, isUserAuthorizedSelector} from "../../store/selectors";
import PrivateRoute from "../private-route/private-route";
import browserHistory from "../../browser-history";

const App = (props) => {

  const {offers, isUserAuthorized} = props;

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={Path.MAIN}>
          <Main />
        </Route>
        <PrivateRoute exact path={Path.FAVORITES} redirectTo={Path.LOGIN} render={() => (
          <Favorites
            offers = {offers}
          />
        )}
        />
        <Route exact path={`${Path.OFFER}/:id`} render={({match}) => (
          <Offer
            offerId = {match.params.id}
          />
        )}
        />
        <Route exact path={Path.LOGIN} render={() => {
          return (
            isUserAuthorized ? <Main /> : <Login/>
          );
        }}
        />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(OfferPropTypes.isRequired).isRequired,
  isUserAuthorized: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  offers: offersSelector(state),
  isUserAuthorized: isUserAuthorizedSelector(state),
});

export {App};
export default connect(mapStateToProps, null)(App);
