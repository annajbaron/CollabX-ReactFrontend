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
          onClick={() => this.props.selectCollection(collection)}
          className="list-group-item"
          >
            {collection.name}
          </li>
      );
    });
  }

  render() {
    const {collections} = this.props;
    if (collections){
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
