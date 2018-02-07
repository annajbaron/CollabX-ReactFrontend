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
  // constructor(props) {
  //   super();
  //
  //   this.state = {
  //     user: null,
  //     loading: true
  //   };
  // }
  //
  // signOut () {
  //   localStorage.removeItem('jwt');
  //   this.setState({user: null});
  // }

  // signIn () {
  //   const jwt = localStorage.getItem('jwt');
  //   if (jwt) {
  //     const payload = jwtDecode(jwt);
  //     this.setState({user: payload, loading: false});
  //   } else {
  //     this.setState({loading: false});
  //   }
  // }

  // componentDidMount () {
  //   this.signIn();
  // }

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
