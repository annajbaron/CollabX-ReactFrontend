import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {Follow} from '../requests/follows';
import { Button } from 'reactstrap';
import ClickOutHandler from 'react-onclickout';


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
        null
      )
    }
    const targetFollow = followedBrands.find(function(follow) {
      return follow.brand_id == brand.id;
    });
      return(
        <div className="modal-content">
          <div className="modal-header">
            { followedBrands.map(follow => follow.brand_id).includes(brand.id) ?
              <i className="material-icons follow" onClick={() => this.removeFollow(targetFollow)}>add</i>
              :
              <i className="material-icons follow" onClick={() => this.addFollow(brand)}>done</i>
            }
            <h5 className="modal-title">
              {brand.name.toUpperCase()}
            </h5>
              { !brand.founded ?
                <div>Creations ongoing...</div>
                :
                <div>
                  Est. {brand.founded}
                </div>
              }
          </div>
          <div className="modal-body">
            { !brand.hq ?
              <div>Artist</div>
              :
              <div>
                {brand.hq}<br />
              </div>
            }
          </div>
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
