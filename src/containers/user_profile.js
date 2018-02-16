import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {Collection} from '../requests/collections';
import WrappedContainer from './map';

class UserProfile extends Component {

  render() {
    const {user, followedBrands} = this.props;
    return(
      <div className="user-profile">
        <h1 className="page-header">PROFILE</h1>
        <div className="followed-brand-list">
          { followedBrands.map((follow) => {
            return (
              <div
                key={follow.brand.name}
                className="followed-brand-item"
                style={{
                  background: `url(https://s3.amazonaws.com/collab-x-pictures/${follow.brand.name.replace( /\s/g, "").toLowerCase()}) center`,
                  backgroundSize: 'cover',
                  width: '10vw',
                  height: '10vw'
                }}
              />
            )
            })
          }
        </div>
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
