import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {Collection} from '../requests/collections';


class CollectionList extends Component {
  componentDidMount() {
    Collection
      .all()
      .then((res) => {
        this.props.getCollections(res);
      })
  }

  triggerSlides() {
    // const collectionimg = collection.name.replace( /\s/g, "").toLowerCase();
    console.log('slides triggered');

  }

  renderList() {
    return this.props.collections.map((collection) => {
      const collectionimg = collection.name.replace( /\s/g, "").toLowerCase();
      // onMouseOver={this.triggerSlides}
      return (
        <div
          key={collection.name}
          onClick={() => this.props.selectCollection(collection)}
          className="collection-sneak-peak"
          style={{
            background: `url(https://s3.amazonaws.com/collab-x-pictures/${collectionimg}1) center`,
            backgroundSize: 'cover'
          }}
          >
            <div className="collection-title">
              {collection.name}
            </div>
          </div>
      );
    });
  }

  render() {
    const {collections} = this.props;
    if (collections){
      return(
        <div className="page">
          <h1 className="page-header">COLLECTIONS 2017</h1>
          <div className="collection-list">
            {this.renderList()}
          </div>
        </div>
      )} else {
        return <div/>;
      }
  }
}

function mapStateToProps(state) {
  return {
    collections: state.collections ? state.collections : null
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCollections: collections => dispatch(actions.getCollections(collections)),
    selectCollection: collection => dispatch(actions.selectCollection(collection))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
