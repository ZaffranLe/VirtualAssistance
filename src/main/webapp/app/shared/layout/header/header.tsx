import './header.css';
import React from 'react';
import { Translate, translate } from 'react-jhipster';
import {
  Navbar,
  Nav,
  NavbarToggler,
  DropdownToggle,
  DropdownMenu,
  NavbarBrand,
  Dropdown,
  Collapse,
  NavItem,
  NavLink,
  DropdownItem
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import { NavDropdown, Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from './menus';
import { ComponentsMenu } from './menus/components';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

export interface IHeaderState {
  menuOpen: boolean;
  menuAccOpen: boolean;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false,
    menuAccOpen: false
  };

  handleLocaleChange = event => {
    this.props.onLocaleChange(event.target.value);
  };

  toggleMenu = () => {
    // this.setState({ menuOpen: !this.state.menuOpen });
  };
  toggleMenuAcc = () => {
    this.setState({ menuAccOpen: !this.state.menuAccOpen });
  };

  render() {
    const { currentLocale, isAuthenticated, isAdmin, isSwaggerEnabled, isInProduction } = this.props;

    /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

    return (
      <div id="app-header">
        <LoadingBar className="loading-bar" />
        <Navbar dark expand="sm" fixed="top" className="jh-navbar">
          <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} />
          <Brand />
          <Collapse isOpen={this.state.menuOpen} navbar>
            <Nav id="header-tabs" className="ml-auto" navbar>
              <Home onClick={this.toggleMenu} />
              {isAuthenticated && isAdmin && <EntitiesMenu />}
              {isAuthenticated &&
                !isAdmin && (
                  <>
                    <NavItem>
                      <NavLink onClick={this.toggleMenu} tag={Link} to="/entity/teacher">
                        <FontAwesomeIcon icon="user" />&nbsp;<Translate contentKey="global.menu.entities.teacher" />
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={this.toggleMenu} tag={Link} to="/entity/notification">
                        <FontAwesomeIcon icon="bells" />&nbsp;<Translate contentKey="global.menu.entities.notification" />
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={this.toggleMenu} tag={Link} to="/entity/document">
                        <FontAwesomeIcon icon="folders" />&nbsp;<Translate contentKey="global.menu.entities.document" />
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={this.toggleMenu} tag={Link} to="/entity/full-evaluate">
                        <FontAwesomeIcon icon="file" />&nbsp;<Translate contentKey="global.menu.entities.fullEvaluate" />
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={this.toggleMenu} tag={Link} to="/component/survey">
                        <FontAwesomeIcon icon="pencil" />
                        <span>
                          <Translate contentKey="global.menu.components.survey">Evaluate</Translate>
                        </span>
                      </NavLink>
                    </NavItem>
                  </>
                )}
              {isAuthenticated && isAdmin && <AdminMenu showSwagger={isSwaggerEnabled} />}
              <LocaleMenu currentLocale={currentLocale} onClick={this.handleLocaleChange} />
              <Dropdown isOpen={this.state.menuAccOpen} nav inNavbar id="account-menu" toggle={this.toggleMenuAcc}>
                <DropdownToggle nav caret className="d-flex align-items-center">
                  <FontAwesomeIcon icon="user" />
                  <span>{translate('global.menu.account.main')} </span>
                </DropdownToggle>
                {isAuthenticated ? this.accountMenuItemsAuthenticated() : this.accountMenuItems()}
              </Dropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
  accountMenuItemsAuthenticated() {
    return (
      <DropdownMenu>
        <DropdownItem tag={Link} to="/account/settings">
          <FontAwesomeIcon icon="wrench" /> <Translate contentKey="global.menu.account.settings">Settings</Translate>
        </DropdownItem>
        <DropdownItem tag={Link} to="/account/password">
          <FontAwesomeIcon icon="clock" /> <Translate contentKey="global.menu.account.password">Password</Translate>
        </DropdownItem>
        <DropdownItem tag={Link} to="/logout">
          <FontAwesomeIcon icon="sign-out-alt" /> <Translate contentKey="global.menu.account.logout">Sign out</Translate>
        </DropdownItem>
      </DropdownMenu>
    );
  }
  accountMenuItems() {
    return (
      <DropdownMenu>
        <DropdownItem id="login-item" tag={Link} to="/login">
          <FontAwesomeIcon icon="sign-in-alt" /> <Translate contentKey="global.menu.account.login">Sign in</Translate>
        </DropdownItem>
        <DropdownItem tag={Link} to="/register">
          <FontAwesomeIcon icon="sign-in-alt" /> <Translate contentKey="global.menu.account.register">Register</Translate>
        </DropdownItem>
      </DropdownMenu>
    );
  }
}
