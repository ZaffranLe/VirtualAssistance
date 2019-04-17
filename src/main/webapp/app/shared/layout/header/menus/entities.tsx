import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = () => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <DropdownItem tag={Link} to="/entity/notification">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.notification" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/document-type">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.documentType" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/notification-type">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.notificationType" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/head-quater">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.headQuater" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/criteria-type">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.criteriaType" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/criteria-evaluate">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.criteriaEvaluate" />
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
