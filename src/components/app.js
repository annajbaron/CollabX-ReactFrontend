import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import BrandList from '../containers/brand_list';
import BrandDetail from '../containers/brand_detail';
import SignIn from '../containers/sign_in';
import SignUp from '../containers/sign_up';
import NavBar from '../containers/nav_bar';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

export default class App extends Component {

  render() {
    return (
      <Router>
        <div>
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
