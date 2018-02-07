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
      <nav
        style={{
          padding: '10px',
          display: 'flex',
        }}
        >
        <Link style={{marginRight: '20px'}} to="/">Home</Link>
        <Link to="/brands">Brands</Link>
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
                >
                  Sign Out
                </a>
              ]) : ([
                <Link
                  style={{marginLeft: 'auto', marginRight: '20px'}}
                  to="/signin"
                  key='1'
                  >
                    Sign In
                  </Link>,
                  <Link
                    style={{marginLeft: 'auto', marginRight: '20px'}}
                    to="/signup"
                    key='2'
                    >
                      Sign Up
                    </Link>
                  ])
                }
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
