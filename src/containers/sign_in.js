import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import jwtDecode from 'jwt-decode';
import {Token} from '../requests/tokens';

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
    const {onSignIn = () => {}} = this.props;
    const {email, password} = this.state;
    Token
      .create({email, password})
      .then(data => {
        if (!data.error) {
          const {jwt} = data;
          localStorage.setItem('jwt', jwt);
          //redirect
          onSignIn();
        }
      }).then(
        () => {
          const jwt = localStorage.getItem('jwt');
          const payload = jwtDecode(jwt);
          console.log(payload.full_name);
          this.props.createUserAction(payload.full_name);
          this.props.createTokenAction(payload.is_admin);
        }
      )
      const newState = Object.assign({}, this.state, {
      email: "", password: "",
      });
      this.setState(newState);
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
    attachUser: user => dispatch(actions.attachUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
