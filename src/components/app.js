import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import BrandPage from '../containers/brand_page';
import SignIn from '../containers/sign_in';
import SignUp from '../containers/sign_up';
import NavBar from '../containers/nav_bar';
import Welcome from '../containers/welcome';
import CollectionList from '../containers/collection_list';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {Follow} from '../requests/follows';
import AuthRoute from '../containers/auth_route';
import UserProfile from '../containers/user_profile';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

class App extends Component {

componentDidMount() {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    const payload = jwtDecode(jwt);
    this.props.attachUser(payload);
    Follow
      .all()
      .then(this.props.setFollowedBrands);
  } else {
    console.log('no user');
  }
}

isAuth () {
  return !!this.props.user
}

  render() {
    return (
      <Router>
        <div>
          <Welcome />
          <NavBar />
          <Switch>
            <Route path="/" exact>
              <div><CollectionList /></div>
            </Route>
            <Route path="/sign_up">
              <div><SignUp /></div>
            </Route>
            <Route path="/sign_in">
              <div><SignIn /></div>
            </Route>
            <AuthRoute
              isAuthenticated={this.isAuth()}
              path="/brands"
              exact
              component={BrandPage}
            />
            <AuthRoute
              isAuthenticated={this.isAuth()}
              path="/profile"
              exact
              component={UserProfile}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user ? state.user : null
  };
}

function mapDispatchToProps(dispatch) {
  return {
    attachUser: user => dispatch(actions.attachUser(user)),
    setFollowedBrands: following => dispatch(actions.setFollowedBrands(following))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
