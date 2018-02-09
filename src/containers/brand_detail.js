import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {Follow} from '../requests/follows';

class BrandDetail extends Component {
  addFollow(brand) {
    Follow
      .create(brand)
      .then((res) => {
        this.props.addFollowedBrands(res);
      })
  }

  removeFollow(followId) {
    Follow
      .destroy(followId)
      .then((res) => {
        this.props.removeFollowedBrands(followId);
      })
  }


  render() {
    const { brand, followedBrands } = this.props;
    if (!this.props.brand) {
      return(
        <div>Select a brand.</div>
      )
    }
    const targetFollow = followedBrands.find(function(follow) {
      return follow.brand_id == brand.id;
    });
      return(
        <div className="brand-detail">
          <h3>Details for:</h3>
          <div>{this.props.brand.name}</div>
          <div>Founded in {this.props.brand.founded}</div>
          <div>HQ: {this.props.brand.hq}</div>
          { followedBrands.map(follow => follow.brand_id).includes(brand.id) ?
            <button
              brand={this.props.brand}
              onClick={() => this.removeFollow(targetFollow)}
              > Over it -
            </button>
            :
            <button
              brand={this.props.brand}
              onClick={() => this.addFollow(brand)}
              > Add to Rotation +
            </button>
          }
        </div>
      );

  }
}

function mapStateToProps(state) {
  return {
    brand: state.activeBrand,
    followedBrands: state.followedBrands
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addFollowedBrands: newFollow => dispatch(actions.addFollowedBrands(newFollow)),
    removeFollowedBrands: removeFollow => dispatch(actions.removeFollowedBrands(removeFollow))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandDetail);
