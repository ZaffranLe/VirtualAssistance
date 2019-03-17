import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const ComponentsMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Components" id="entity-menu">
    <DropdownItem tag={Link} to="/component/survey">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.components.survey" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/component/documents">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.document" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/component/notifications">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.notification" />
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
