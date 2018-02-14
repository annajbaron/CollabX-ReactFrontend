import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {Like} from '../requests/likes';
import Moment from 'react-moment';

class CollectionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: new Array(props.collection && props.collection.pictures)
        .fill()
        .map((el, i) => `https://s3.amazonaws.com/collab-x-pictures/${props.collection && props.collection.name.replace( /\s/g, "").toLowerCase()}${i+1}`)
    }
  }

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
    if (!this.props.collection) {
      return(
        <div></div>
      )
    }
    const targetLike = likedCollections.find(function(like) {
      return like.collection_id == collection.id;
    });
      return(
        <div className="modal-content collection-modal">
          <div className="modal-header">
            { likedCollections.map(like => like.collection_id).includes(collection.id) ?
              <i className="material-icons follow"
                onClick={() => this.removeLike(targetLike)}
                >bookmark
              </i>
              :
              <i className="material-icons follow"
                onClick={() => this.addLike(collection)}
                >bookmark_border
              </i>
            }
            <h5 className="modal-title">
              {this.props.collection.name}
            </h5>
            <Moment format="MMMM Do YYYY">
              {this.props.collection.date}
            </Moment>
          </div>
          <div className="modal-body">
            {this.state.pictures.map((picture, i) => (
              <div key={i}>
                <img className="collection-picture" src={picture} />
              </div>
            ))}
          </div>
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
