import React from 'react';
import BrandList from './brand_list';
import BrandDetail from './brand_detail';

function BrandPage (props) {
  return (
    <div>
      <BrandList />
      <BrandDetail />
    </div>
  )
}

export default BrandPage;
