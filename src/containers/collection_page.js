import React from 'react';
import CollectionList from './collection_list';
import CollectionDetail from './collection_detail';

function CollectionPage (props) {
  return (
    <div>
      <CollectionList />
      <CollectionDetail />
    </div>
  )
}

export default CollectionPage;
