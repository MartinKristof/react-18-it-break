import React, { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'reactstrap';

import NavBar from './NavBar';
import Spinner from './Spinner';

const Sidebar = lazy(() => import('./Sidebar' /* webpackPrefetch: true */));
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const Layout = () => (
  <>
    <NavBar />
    <aside className="sidebar">
      <Suspense fallback={<Spinner />}>
        <Sidebar />
      </Suspense>
    </aside>
    <section>
      <Container className="my-5">
        <Outlet />
      </Container>
    </section>
  </>
);

export default Layout;
