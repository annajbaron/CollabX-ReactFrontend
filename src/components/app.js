import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import BrandPage from '../containers/brand_page';
import SignIn from '../containers/sign_in';
import SignUp from '../containers/sign_up';
import NavBar from '../containers/nav_bar';
import Welcome from '../containers/welcome';
import CollectionList from '../containers/collection_list';
import CollectionDetail from '../containers/collection_detail';
import CollectionPage from '../containers/collection_page';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {Follow} from '../requests/follows';
import AuthRoute from '../containers/auth_route';
import AntiAuthRoute from '../containers/anti_auth_route';
import UserProfile from '../containers/user_profile';
import PitchPage from '../containers/pitch';

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
          { this.props.site ?
            <div></div>
            :
            <Welcome />
          }
          <NavBar />
          <Switch>
            <Route path="/" exact>
              <div>
                <CollectionList />
                <CollectionDetail />
              </div>
            </Route>
            <Route path="/sign_up">
              <div><SignUp /></div>
            </Route>

            <Route
              path="/sign_in"
              render={props => {
                return <AntiAuthRoute
                        isAuthenticated={!this.isAuth()}
                        path='/sign_in'
                        component={SignIn}
                      />
              }}
            />
            <AuthRoute
              isAuthenticated={this.isAuth()}
              path="/brands"
              exact
              component={BrandPage}
            />
            <AuthRoute
              isAuthenticated={this.isAuth()}
              path="/pitches"
              exact
              component={PitchPage}
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
    user: state.user ? state.user : null,
    site: state.site
  };
}

function mapDispatchToProps(dispatch) {
  return {
    attachUser: user => dispatch(actions.attachUser(user)),
    setFollowedBrands: following => dispatch(actions.setFollowedBrands(following))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
