import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {Like} from '../requests/likes';
import Moment from 'react-moment';

class CollectionDetail extends Component {
  addLike(collection) {
    Like
      .create(collection)
      .then((res) => {
        this.props.addLikedCollections(res);
      })
  }

  removeLike(likeId) {
    Like
      .destroy(likeId)
      .then((res) => {
        this.props.removeLikedCollections(likeId);
      })
  }


  render() {
    const { collection, likedCollections } = this.props;
    console.log(likedCollections);
    if (!this.props.collection) {
      return(
        <div></div>
      )
    }
    const targetLike = likedCollections.find(function(like) {
      return like.collection_id == collection.id;
    });
      return(
        <div className="collection-detail">
          <h3>Details for:</h3>
          <div>{this.props.collection.name}</div>
          <div>
            <Moment format="MMMM Do YYYY">
              {this.props.collection.date}
            </Moment>
          </div>
          { likedCollections.map(like => like.collection_id).includes(collection.id) ?
            <i className="material-icons"
              onClick={() => this.removeLike(targetLike)}
              >bookmark
            </i>
            :
            <i className="material-icons"
              onClick={() => this.addLike(collection)}
              >bookmark_border
            </i>
          }
        </div>
      );

  }
}

function mapStateToProps(state) {
  return {
    collection: state.activeCollection,
    likedCollections: state.likedCollections
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addLikedCollections: addLike => dispatch(actions.addLikedCollections(addLike)),
    removeLikedCollections: removeLike => dispatch(actions.removeLikedCollections(removeLike))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionDetail);
