import React, {Component} from 'react';
import { connect } from 'react-redux';


class BrandDetail extends Component {
  render() {
    if (!this.props.brand) {
      return(
        <div>Select a brand.</div>
      )
    }
    return(
      <div>
        <h3>Details for:</h3>
        <div>{this.props.brand.name}</div>
        <div>Founded in {this.props.brand.founded}</div>
        <div>HQ: {this.props.brand.hq}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    brand: state.activeBrand
  };
}

export default connect(mapStateToProps)(BrandDetail);
