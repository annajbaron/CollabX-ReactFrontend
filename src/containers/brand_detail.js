import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {Follow} from '../requests/follows';
import {Collection} from '../requests/collections';
import { Button } from 'reactstrap';
import ClickOutHandler from 'react-onclickout';


class BrandDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temp: []
    }
  }

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

  loadCollections(id){
    Collection
      .get(id)
      .then(res => this.setState({temp: res}))
      .then(res => console.log(res.name))
  }


  render() {
    const { brand, followedBrands } = this.props;
    if (!this.props.brand) {
      return(null)
    }
    const targetFollow = followedBrands.find(function(follow) {
      return follow.brand_id == brand.id;
    });
    const collectionIds = brand.collaborators.map(collaborator => collaborator.collection_id)
    // collectionIds.map(id => this.loadCollections(id))
    // console.log(collectionIds);
      return(
        <div className="modal-content">
          <div className="modal-header">
            { followedBrands.map(follow => follow.brand_id).includes(brand.id) ?
              <i className="material-icons follow" onClick={() => this.removeFollow(targetFollow)}>done</i>
              :
              <i className="material-icons follow" onClick={() => this.addFollow(brand)}>add</i>
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
            Latest Collabs
            <div>
              {
                this.state.temp.map(hello => (<div>{hello.name}</div>))
              }
            </div>
          </div>
          <div className="modal-footer">
            { !brand.hq ?
              ([
                <div>Worldwide&nbsp;</div>,
                <i className="material-icons">flight_takeoff</i>
              ])
              :
              ([
                <div>{brand.hq}&nbsp;</div>,
                <i className="material-icons">room</i>
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
