import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import {User} from '../requests/users';
import {Token} from '../requests/tokens';

class SignUp extends React.Component {
  constructor(){
    super();
    this.state = {
        first_name: "",
        last_name: "",
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
        }
      })
      const newState = Object.assign({}, this.state, {
      first_name: "", last_name: "", email: "", password: ""
      });
      this.setState(newState);
  }

  signUp(){
    User
      .create({user: this.state})
      .then((user) => {
        this.props.createUser(user)
        this.createToken();
      })
  }

  render() {
    return (
      <div>
        <form>
          <p>SIGN UP</p>
          <div className="form-group row">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                name="first_name"
                onInput={this.handleChange.bind(this)}
                value={this.state.first_name}
                placeholder="FIRST NAME"
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                name="last_name"
                onInput={this.handleChange.bind(this)}
                value={this.state.last_name}
                placeholder="LAST NAME"
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                name="email"
                onInput={this.handleChange.bind(this)}
                value={this.state.email}
                placeholder="E-MAIL"
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-12">
              <input
                type="password"
                className="form-control"
                name="password"
                onInput={this.handleChange.bind(this)}
                value={this.state.password}
                placeholder="PASSWORD"/>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-12 button-column">
              <button
                type="button"
                className="form-submit btn btn-primary"
                onClick={()=>this.signUp()}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </form>

      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: user => dispatch(actions.createUser(user)),
    attachUser: user => dispatch(actions.attachUser(user))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
