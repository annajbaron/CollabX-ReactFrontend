import React, { Component } from 'react';

import BrandList from '../containers/brand_list';
import BrandDetail from '../containers/brand_detail';
import SignIn from '../containers/sign_in';

export default class App extends Component {
  render() {
    return (
      <div>
        <SignIn />
        <BrandList />
        <BrandDetail />
      </div>
    );
  }
}
