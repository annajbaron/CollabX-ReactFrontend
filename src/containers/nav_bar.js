import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';

class NavBar extends Component {

  handleSignOut(user) {
    localStorage.removeItem('jwt');
    this.props.detachUser(user);
  };

  render() {
    const {user} = this.props;
    return (
      <nav className="nav-bar">
        <Link to="/"><img src="https://s3.amazonaws.com/collab-x-pictures/logo" alt="" className="badge"/></Link>
        <div className="menu">
          <Link to="/brands" className="menu-item">Brands</Link>
          {
            user ? ([
              <span
                key='1'
              >
                Hello, {user.first_name}
              </span>,
              <a
                onClick={() => this.handleSignOut(user)}
                key='2'
                href="#"
                className="menu-item"
              >
                Sign Out
              </a>
              ]) : ([
              <Link
                to="/signin"
                key='1'
                className="menu-item"
              >
                Sign In
              </Link>,
              <Link
                to="/signup"
                key='2'
                className="menu-item"
              >
                Sign Up
              </Link>
            ])
          }
        </div>

      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    detachUser: user => dispatch(actions.detachUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
