import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {Follow} from '../requests/follows';
import { Button } from 'reactstrap';

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
        <div className="modal-content modal-fade">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModal3Label">
              {brand.name}
              <Button className="close" onClick={() => this.props.exitBrand(false)}>
                &times;
              </Button>
            </h5>
          </div>
          <div className="modal-body">
            { !brand.hq ?
              <div>Artist</div>
              :
              <div>
                {brand.hq}<br />
              </div>
            }
            { !brand.founded ?
              <div>Creations ongoing...</div>
              :
              <div>
                Est. {brand.founded}
              </div>
            }
            { followedBrands.map(follow => follow.brand_id).includes(brand.id) ?
              <Button
                onClick={() => this.removeFollow(targetFollow)}
                > Over it -
              </Button>
              :
              <Button
                onClick={() => this.addFollow(brand)}
                > Add to Rotation +
              </Button>
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
    removeFollowedBrands: removeFollow => dispatch(actions.removeFollowedBrands(removeFollow)),
    exitBrand: status => dispatch(actions.exitBrand(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandDetail);
