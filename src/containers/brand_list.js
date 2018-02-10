import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {Brand} from '../requests/brands';

class BrandList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: ""
    }
  }

  componentDidMount() {
    Brand
      .all()
      .then((res) => {
        this.props.getBrands(res);
      })
  }

  handleChange(event) {
    const newState = Object.assign({}, this.state, {
      [event.target.name]: event.target.value,
    });
    this.setState(newState);
    console.log(this.state);
    this.props.getBrands();
  }

  renderList() {
    const refinedBrands = this.props.brands.filter(brand => brand.name.toLowerCase().includes(this.state.searchValue));
    return refinedBrands.map((brand) => {
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
    const {brands} = this.props;

    return (
      <div>
        <form className="searchbar">
          <div className="form-group row">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
              <input
                type="text"
                name="searchValue"
                className="form-control"
                placeholder="Search..."
                value={this.state.searchValue}
                onInput={this.handleChange.bind(this)}
              />
            </div>
          </div>
        </form>
        { brands ?
            <ul className="list-group col-sm-4">
              {this.renderList()}
            </ul>
          :
            <div/>
        }
      </div>
    )

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
