import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

class NavBar extends Component {

  handleSignOut(user) {
    localStorage.removeItem('jwt');
    this.props.detachUser(user);
  };

  render() {
    const {user} = this.props;
    return (
      <div>
      <Navbar className="nav-bar">
        <Nav navbar className="menu">
          <NavItem className="nav-item">
            <NavLink tag={Link} to="/" className="font-effect-anaglyph"><img src="https://s3.amazonaws.com/collab-x-pictures/logo" alt="" className="badge"/></NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink tag={Link} to="/brands" className="menu-item font-effect-anaglyph">brands</NavLink>
          </NavItem>
            {
              user ? ([
                <NavItem className="nav-item">
                  <NavLink
                    tag={Link}
                    to="/profile"
                    className="menu-item font-effect-anaglyph"
                  >
                    hello, {user.first_name}
                  </NavLink>
                </NavItem>,
                <NavItem className="nav-item">
                  <NavLink
                    onClick={() => this.handleSignOut(user)}
                    to="#"
                    className="menu-item font-effect-anaglyph"
                  >
                    sign out
                  </NavLink>
                </NavItem>
              ])
                 :
              ([
                <NavItem className="nav-item">
                  <NavLink
                    tag={Link}
                    to="/sign_in"
                    className="menu-item font-effect-anaglyph"
                  >
                    sign in
                  </NavLink>
                </NavItem>,
                <NavItem className="nav-item">
                  <NavLink
                    tag={Link}
                    to="/sign_up"
                    className="menu-item font-effect-anaglyph"
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
