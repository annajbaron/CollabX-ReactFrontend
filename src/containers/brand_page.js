import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {Brand} from '../requests/brands';
import { Form, FormGroup, Input } from 'reactstrap';
import BrandDetail from './brand_detail';
import ClickOutHandler from 'react-onclickout';

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
          className="grid-item"
          style={{
            background: `url(https://s3.amazonaws.com/collab-x-pictures/${logo}) center`,
            backgroundSize: 'cover',
            width: '15vw',
            height: '15vw'
          }}
        >
        <div
          className="brand-detail"
          onClick={() => this.props.selectBrand(brand)}
        >{brand.name}</div>
        </div>
      )
    })
  }

  render() {
    const {brands} = this.props;
    return (
      <ClickOutHandler onClickOut={() => this.props.exitBrand(false)}>
        <div className="brand-page">
          <h1 className="page-header">BRANDS</h1>
          <Form>
            <FormGroup>
                <Input
                  type="text"
                  name="searchValue"
                  className="collab-input"
                  size='sm'
                  placeholder="TYPE TO SEARCH"
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
      </ClickOutHandler>
    )
  }
}

function mapStateToProps(state) {
  return {
    brands: state.brands ? state.brands : null
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectBrand: brand => dispatch(actions.selectBrand(brand)),
    getBrands: brands => dispatch(actions.getBrands(brands)),
    exitBrand: status => dispatch(actions.exitBrand(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandPage);
