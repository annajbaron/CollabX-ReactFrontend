import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import BrandPage from '../containers/brand_page';
import SignIn from '../containers/sign_in';
import SignUp from '../containers/sign_up';
import NavBar from '../containers/nav_bar';
import Welcome from '../containers/welcome';
import CollectionPage from '../containers/collection_page';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {Follow} from '../requests/follows';
import {Like} from '../requests/likes';
import {Vote} from '../requests/votes';
import AuthRoute from '../containers/auth_route';
import AntiAuthRoute from '../containers/anti_auth_route';
import UserProfile from '../containers/user_profile';
import PitchPage from '../containers/pitch';
import Upcoming from '../containers/upcoming';

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
    Like
      .all()
      .then(this.props.setLikedCollections);
    Vote
      .all()
      .then(this.props.setVotedPitches);
  } else {
    console.log('No User');
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
            <AuthRoute
              isAuthenticated={this.isAuth()}
              path="/"
              exact
              component={CollectionPage}
            />
            {/* <Route path="/" exact>
              <div>
                <CollectionPage />
              </div>
            </Route> */}
            <Route
              path="/sign_up"
              render={props => {
                return <AntiAuthRoute
                        isAuthenticated={!this.isAuth()}
                        path='/sign_up'
                        component={SignUp}
                      />
              }}
            >
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
              path="/upcoming"
              exact
              component={Upcoming}
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
    setFollowedBrands: following => dispatch(actions.setFollowedBrands(following)),
    setLikedCollections: liked => dispatch(actions.setLikedCollections(liked)),
    setVotedPitches: voted => dispatch(actions.setVotedPitches(voted))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
