/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';

const NavBar = () => (
  <Navbar color="dark" dark>
    <NavbarBrand href="/">React IT break</NavbarBrand>
    <Nav className="me-auto" navbar>
      <NavItem>
        <NavLink href="/">Hello</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/posts/">Posts</NavLink>
      </NavItem>
    </Nav>
  </Navbar>
);

export default NavBar;
