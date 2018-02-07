import React, { Component } from 'react';

import BrandList from '../containers/brand_list';
import BrandDetail from '../containers/brand_detail';
import SignIn from '../containers/sign_in';
import SignUp from '../containers/sign_up';

export default class App extends Component {
  render() {
    return (
      <div>
        <SignUp />
        <SignIn />
        <BrandList />
        <BrandDetail />
      </div>
    );
  }
}
