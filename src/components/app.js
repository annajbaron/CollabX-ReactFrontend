import React, { Component } from 'react';

import BrandList from '../containers/brand_list';
import BrandDetail from '../containers/brand_detail';

export default class App extends Component {
  render() {
    return (
      <div>
        <BrandList />
        <BrandDetail />
      </div>
    );
  }
}
