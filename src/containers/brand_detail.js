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
      return(null)
    }
    const targetFollow = followedBrands.find(function(follow) {
      return follow.brand_id == brand.id;
    });

      return(
        <div className="modal-content">
          <div className="modal-header">
            { followedBrands.map(follow => follow.brand_id).includes(brand.id) ?
              <div onClick={() => this.removeFollow(targetFollow)}>
                <p className="follow">over it
                <i className="material-icons">done</i>
                </p>
              </div>
              :
              <div onClick={() => this.addFollow(brand)}>
                <p className="follow">add to rotation
                  <i className="material-icons">add</i>
                </p>
              </div>
            }
            <h5 className="modal-title">
              {brand.name.toUpperCase()}
            </h5>
              { !brand.founded ?
                <div>Creations ongoing ...</div>
                :
                <div>
                  Est. {brand.founded}
                </div>
              }
          </div>
          <div className="modal-body">
            {
              this.props.collectionNames.length >= 1 ?
              <div>
                Latest Collabs: &nbsp;
              </div>
              :
              <div>
                No collabs as of now ...
              </div>
            }
            <div>
              {
                this.props.collectionNames && this.props.collectionNames.map((name, i) => (<div key={i}>{name}</div>))
              }
            </div>
          </div>
          <div className="modal-footer">
            { !brand.hq ?
              ([
                <div key="1">Worldwide&nbsp;</div>,
                <i className="material-icons" key="2">flight_takeoff</i>
              ])
              :
              ([
                <div key="1">{brand.hq}&nbsp;</div>,
                <i className="material-icons" key="2">room</i>
              ])
            }
          </div>
        </div>
      );

  }
}

function mapStateToProps(state) {
  return {
    brand: state.activeBrand,
    followedBrands: state.followedBrands,
    collections: state.collections
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addFollowedBrands: newFollow => dispatch(actions.addFollowedBrands(newFollow)),
    removeFollowedBrands: removeFollow => dispatch(actions.removeFollowedBrands(removeFollow))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandDetail);
