import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {Collection} from '../requests/collections';

class CollectionOverview extends Component {

  render() {
    return(
      <div
        key={this.props.collection.name}
        onClick={() => this.props.selectCollection(this.props.collection)}
        className="collection-sneak-peak"
        style={{
          background: `url(https://s3.amazonaws.com/collab-x-pictures/${this.props.collectionimg}1) center`,
          backgroundSize: 'cover'
        }}
        >
          <div className="collection-title">
            {this.props.collection.name}
          </div>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    likedCollections: state.likedCollections
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectCollection: collection => dispatch(actions.selectCollection(collection))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionOverview);
