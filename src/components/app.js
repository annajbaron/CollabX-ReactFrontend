import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import BrandList from '../containers/brand_list';
import BrandDetail from '../containers/brand_detail';
import SignIn from '../containers/sign_in';
import SignUp from '../containers/sign_up';
import NavBar from '../containers/nav_bar';
import Welcome from '../containers/welcome';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {Follow} from '../requests/follows';

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

  render() {
    return (
      <Router>
        <div>
          <Welcome />
          <NavBar />
          <Switch>
            <Route path="/signup">
              <div><SignUp /></div>
            </Route>
            <Route path="/signin">
              <div><SignIn /></div>
            </Route>
            <Route path="/brands">
              <div>
                <BrandList />
                <BrandDetail />
              </div>
            </Route>
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
