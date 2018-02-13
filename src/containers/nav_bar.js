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
      <div className="collab-nav">
        <NavLink tag={Link} to="/"><img src="https://s3.amazonaws.com/collab-x-pictures/logoheader" className="collab-x-logo"/></NavLink>
      <Navbar className="nav-bar">
        <Nav className="menu">
          <NavItem className="nav-item">
            <NavLink tag={Link} to="/" className="menu-item">collabs</NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink tag={Link} to="/brands" className="menu-item">brands</NavLink>
          </NavItem>
            {
              user ? ([
                <NavItem className="nav-item">
                  <NavLink
                    tag={Link}
                    to="/profile"
                    className="menu-item"
                  >
                    hello, {user.first_name}
                  </NavLink>
                </NavItem>,
                <NavItem className="nav-item">
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
                <NavItem className="nav-item">
                  <NavLink
                    tag={Link}
                    to="/sign_in"
                    className="menu-item"
                  >
                    sign in
                  </NavLink>
                </NavItem>,
                <NavItem className="nav-item">
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
