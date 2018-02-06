import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {Follow} from '../requests/follows';


class BrandDetail extends Component {
  addFollow(brand) {
    Follow
      .create(brand)
      .then((res) => {console.log(res)})
      .then(this.props.addFollowedBrands);
      // .then(this.props.setFollowedBrands);
      this.props.setFollowedBrands;
  }

  removeFollow(followId) {
    Follow
      .destroy(followId)
      .then((res) => {console.log(res)})
      .then(this.props.removeFollowedBrands)
      .then(this.props.setFollowedBrands);
  }


  render() {
    const { brand, followedBrands } = this.props;
    if (!this.props.brand) {
      return(
        <div>Select a brand.</div>
      )
    }
    console.log('>>>>>>>>>>>>>');
    console.log(followedBrands);
    console.log('>>>>>>>>>>>>>');
    const targetFollow = followedBrands.find(function(follow) {
      console.log("follow below");
      console.log(follow);
      console.log('brand.id', brand.id);
      return follow.brand_id == brand.id;
    });

    console.log('TARGET BELOW');
    console.log(targetFollow);

      console.log('brand BELOW');
      console.log(brand);
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
    removeFollowedBrands: removeFollow => dispatch(actions.removeFollowedBrands(removeFollow)),
    setFollowedBrands: following => dispatch(actions.setFollowedBrands(following))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandDetail);
