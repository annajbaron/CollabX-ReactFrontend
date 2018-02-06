import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Follow} from '../requests/follows';


class BrandDetail extends Component {
  newFollow(brand) {
    Follow
      .create(brand.id)
      .then((res) => {console.log(res)})
  }

  render() {
    if (!this.props.brand) {
      return(
        <div>Select a brand.</div>
      )
    } else {
      const { brand } = this.props
      return(
        <div className="brand-detail">
          <h3>Details for:</h3>
          <div>{this.props.brand.name}</div>
          <div>Founded in {this.props.brand.founded}</div>
          <div>HQ: {this.props.brand.hq}</div>
          <button
            brand={this.props.brand}
            onClick={() => this.newFollow(brand)}
            >
              Add to rotation +
            </button>
          </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    brand: state.activeBrand
  };
}

export default connect(mapStateToProps)(BrandDetail);
