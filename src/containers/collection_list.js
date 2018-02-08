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

  renderList() {
    return this.props.collections.map((collection) => {
      return (
        <li
          key={collection.name}
          className="list-group-item"
          >
            {collection.name}
          </li>
      );
    });
  }

  render() {
    if (this.props.collections){
      return(
        <ul className="list-group col-sm-4">
          {this.renderList()}
        </ul>
      )} else {
        return <div/>;
      }

  }
}

function mapStateToProps(state) {
  return {
    collections: state.collections
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCollections: collections => dispatch(actions.getCollections(collections))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
