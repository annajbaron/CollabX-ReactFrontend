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
// import { CSSTransitionGroup } from 'react-transition-group';

class NavBar extends Component {

  handleSignOut(user) {
    localStorage.removeItem('jwt');
    this.props.detachUser(user);
  };

  render() {
    const {user} = this.props;
    return (
      <div>
      <Navbar>
        <NavbarBrand to="/"><img src="https://s3.amazonaws.com/collab-x-pictures/logo" alt="" className="badge"/></NavbarBrand>
        <Nav navbar>
          <NavItem className="nav-item">
            <NavLink tag={Link} to="/brands" className="menu-item">BRANDS</NavLink>
          </NavItem>
            {
              user ?
              <div>
                <NavItem className="nav-item">
                  <NavLink
                    tag={Link}
                    to="/profile"
                    className="menu-item"
                  >
                      Hello, {user.first_name}
                  </NavLink>
                </NavItem>
                <NavItem className="nav-item">
                  <NavLink
                    onClick={() => this.handleSignOut(user)}
                    to="#"
                    className="menu-item"
                  >
                    SIGN OUT
                  </NavLink>
                </NavItem>
              </div>
                 :
              <div>
                <NavItem className="nav-item">
                  <NavLink
                    tag={Link}
                    to="/sign_in"
                    className="menu-item"

                  >
                    SIGN IN
                  </NavLink>
                </NavItem>
                <NavItem className="nav-item">
                  <NavLink
                    tag={Link}
                    to="/sign_up"
                    className="menu-item"
                  >
                    SIGN UP
                  </NavLink>
                </NavItem>
              </div>
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
