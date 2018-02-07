import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import jwtDecode from 'jwt-decode';
import {Token} from '../requests/tokens';
import {Follow} from '../requests/follows';

class SignIn extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: ""
    }
  }

  handleChange(event) {
    const newState = Object.assign({}, this.state, {
      [event.target.name]: event.target.value,
    });
    this.setState(newState);
  }

  createToken() {
    const {email, password} = this.state;
    Token
      .create({email, password})
      .then(data => {
        if (!data.error) {
          let {jwt} = data;
          localStorage.setItem('jwt', jwt);
          jwt = localStorage.getItem('jwt');
          const payload = jwtDecode(jwt);
          this.props.attachUser(payload);
          const newState = Object.assign({}, this.state, {
            email: "", password: "",
          });
          this.setState(newState, this.loadProfile);
        }
      })
  }

  loadProfile() {
    const jwt = localStorage.getItem('jwt');
    const user = jwtDecode(jwt);

    Follow
      .all()
      .then(this.props.setFollowedBrands);
  }

  render() {
    return(
      <div className="sign-in">
        <form>
          <label>Email</label>
          <input
            type="text"
            className="form-control input_email"
            name="email"
            placeholder="E-MAIL"
            onInput={this.handleChange.bind(this)}
            value={this.state.email}
          />
          <input
            type="password"
            className="form-control input_password"
            name="password"
            onInput={this.handleChange.bind(this)}
            value={this.state.password}
            placeholder="PASSWORD"
          />
          <button
            type="button"
            className="form-submit btn btn-primary"
            onClick={()=>this.createToken()}
          >
            SUBMIT
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    attachUser: user => dispatch(actions.attachUser(user)),
    setFollowedBrands: following => dispatch(actions.setFollowedBrands(following))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
