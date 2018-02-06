import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import axios from 'axios';

class BrandList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    axios.get('http://localhost:3000/brands.json')
    .then(res => this.props.getBrands(res.data))
    // .then(res => console.log(res))
    .catch(error => console.log(error))
  }

  renderList() {
    return this.props.brands.map((brand) => {
      return (
        <li
          key={brand.name}
          onClick={() => this.props.selectBrand(brand)}
          className="list-group-item"
          >
            {brand.name}
          </li>
      );
    });
  }

  render() {
    if (this.props.brands){
      return(
        <ul className="list-group col-sm-4">
          {this.renderList()}
        </ul>
      )} else {
        return <div/>;
      }

  }
}

function mapStateToProps(state) {
  return {
    brands: state.brands ? state.brands : null,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectBrand: brand => dispatch(actions.selectBrand(brand)),
    getBrands: brands => dispatch(actions.getBrands(brands))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandList);
