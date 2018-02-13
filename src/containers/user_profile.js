import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {Collection} from '../requests/collections';
import WrappedContainer from './map';

class UserProfile extends Component {

  // renderList() {
  //   return this.props.collections.map((collection) => {
  //     return (
  //       <li
  //         key={collection.name}
  //         className="list-group-item"
  //         >
  //           {collection.name}
  //         </li>
  //     );
  //   });
  // }

  render() {
    const {user, followedBrands} = this.props;
    return(
      <div className="user-profile">
        <h1 className="page-header">PROFILE</h1>
        { followedBrands.map((follow) => {
          return (
            <li
              key={follow.brand.name}
              className="list-group-item"
              >
                {follow.brand.name}
              </li>
            )
          })
        }
        <h5 className="map-title">Visit your brands below:</h5>
      <WrappedContainer />
      </div>
    )
}
}

function mapStateToProps(state) {
  return {
    user: state.user,
    followedBrands: state.followedBrands
  };
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
