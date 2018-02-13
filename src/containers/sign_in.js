import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import jwtDecode from 'jwt-decode';
import {Token} from '../requests/tokens';
import {Follow} from '../requests/follows';
import {Like} from '../requests/likes';

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
      });
  }

  loadProfile() {
    const jwt = localStorage.getItem('jwt');
    const user = jwtDecode(jwt);

    Follow
      .all()
      .then(this.props.setFollowedBrands);
    this.loadLikes;
  }

  loadLikes() {
    const jwt = localStorage.getItem('jwt');
    const user = jwtDecode(jwt);

    Like
      .all()
      .then(this.props.setLikedCollections);
    this.props.history.push('/');
  }

  render() {
    return(
      <div className="sign-in">
        <p>SIGN IN</p>
        <form>
          <div className="form-group row">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control input_email"
                name="email"
                placeholder="E-MAIL"
                onInput={this.handleChange.bind(this)}
                value={this.state.email}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <input
                type="password"
                className="form-control input_password"
                name="password"
                onInput={this.handleChange.bind(this)}
                value={this.state.password}
                placeholder="PASSWORD"
              />
            </div>
          </div>
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
    setFollowedBrands: following => dispatch(actions.setFollowedBrands(following)),
    setLikedCollections: liked => dispatch(actions.setLikedCollections(liked))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
