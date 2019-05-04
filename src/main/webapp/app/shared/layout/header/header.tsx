import './header.css';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand } from './header-components';
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
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false
  };

  handleLocaleChange = event => {
    this.props.onLocaleChange(event.target.value);
  };

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
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
                        <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.teacher" />
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={this.toggleMenu} tag={Link} to="/entity/notification">
                        <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.notification" />
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={this.toggleMenu} tag={Link} to="/entity/document">
                        <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.document" />
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={this.toggleMenu} tag={Link} to="/entity/full-evaluate">
                        <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.fullEvaluate" />
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={this.toggleMenu} tag={Link} to="/component/survey">
                        <FontAwesomeIcon icon="asterisk" />
                        <span>
                          <Translate contentKey="global.menu.components.survey">Evaluate</Translate>
                        </span>
                      </NavLink>
                    </NavItem>
                  </>
                )}
              {isAuthenticated && isAdmin && <AdminMenu showSwagger={isSwaggerEnabled} />}
              <LocaleMenu currentLocale={currentLocale} onClick={this.handleLocaleChange} />
              <AccountMenu isAuthenticated={isAuthenticated} />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
