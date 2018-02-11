import React from 'react';
import BrandList from './brand_list';
import BrandDetail from './brand_detail';

function BrandPage (props) {
  return (
    <div>
      <BrandDetail />
      <BrandList />
    </div>
  )
}

export default BrandPage;
