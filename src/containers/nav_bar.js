import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';

class NavBar extends Component {

  handleSignOut(user) {
    localStorage.removeItem('jwt');
    this.props.detachUser(user);
  };

  render() {
    const {user} = this.props;
    return (
      <div className="collab-nav">
        <NavLink tag={Link} to="/"><img src="https://s3.amazonaws.com/collab-x-pictures/collablogo" className="collab-x-logo"/></NavLink>
      <Navbar className="nav-bar">
        <Nav className="menu">
          <NavItem className="nav-item">
            <NavLink tag={Link} to="/" className="menu-item">collabs</NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink tag={Link} to="/upcoming" className="menu-item">upcoming</NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink tag={Link} to="/pitches" className="menu-item">pitch</NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink tag={Link} to="/brands" className="menu-item">brands</NavLink>
          </NavItem>
            {
              user ? ([
                <NavItem key='1' className="nav-item">
                  <NavLink
                    tag={Link}
                    to="/profile"
                    className="menu-item"
                  >
                    hello, {user.first_name}
                  </NavLink>
                </NavItem>,
                <NavItem key='2' className="nav-item">
                  <NavLink
                    onClick={() => this.handleSignOut(user)}
                    to="#"
                    className="menu-item"
                  >
                    sign out
                  </NavLink>
                </NavItem>
              ])
                 :
              ([
                <NavItem key='1' className="nav-item">
                  <NavLink
                    tag={Link}
                    to="/sign_in"
                    className="menu-item"
                  >
                    sign in
                  </NavLink>
                </NavItem>,
                <NavItem key='2' className="nav-item">
                  <NavLink
                    tag={Link}
                    to="/sign_up"
                    className="menu-item"
                  >
                    sign up
                  </NavLink>
                </NavItem>
              ])
            }
        </Nav>
      </Navbar>
    </div>
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
