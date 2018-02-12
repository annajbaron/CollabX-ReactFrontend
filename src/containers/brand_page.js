import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {Brand} from '../requests/brands';
import { Form, FormGroup, Input } from 'reactstrap';
import BrandDetail from './brand_detail';

class BrandPage extends Component {
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
    this.props.getBrands();
  }

  renderList() {
    const refinedBrands = this.props.brands.filter(brand => brand.name.toLowerCase().includes(this.state.searchValue));

    return refinedBrands.map((brand) => {
      const logo = brand.name.replace( /\s/g, "").toLowerCase();
      return (
        <div
          key={brand.name}
          onClick={() => this.props.selectBrand(brand)}
          className="grid-item"
          style={{
            background: `url(https://s3.amazonaws.com/collab-x-pictures/${logo}) center`,
            backgroundSize: 'cover',
            width: '175px',
            height: '175px'
          }}
        >
        <div className="brand-detail">{brand.name}</div>
        </div>
      )
    })
  }

  render() {
    const {brands} = this.props;
    return (
      <div className="brand-page">
        <Form>
          <FormGroup>
              <Input
                type="text"
                name="searchValue"
                className="form-control"
                size='sm'
                placeholder="Search ..."
                value={this.state.searchValue}
                onInput={this.handleChange.bind(this)}
              />
          </FormGroup>
        </Form>
        <BrandDetail />
        <br />
        { brands ?
          <div className="brand-wrapper">
              {this.renderList()}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BrandPage);
