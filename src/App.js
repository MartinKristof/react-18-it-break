/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';

import Posts from './pages/Posts';
import Content from './Content';
import Error from './Error';
import Html from './Html';
import Layout from './Layout';
import NotFound from './NotFound';
import Spinner from './Spinner';

const App = ({ assets }) => (
  <Html assets={assets} title="Hello">
    <Suspense fallback={<Spinner />}>
      <ErrorBoundary FallbackComponent={Error}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Content />} />
            <Route path="posts" element={<Posts />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </Suspense>
  </Html>
);

export default App;
