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

import Error from './components/Error';
import Html from './components/Html';
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import Spinner from './components/ui/Spinner';
import Hello from './pages/Hello';
import Posts from './pages/Posts';

const App = ({ assets }) => (
  <Html assets={assets} title="Hello">
    <Suspense fallback={<Spinner />}>
      <ErrorBoundary FallbackComponent={Error}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Hello />} />
            <Route path="posts" element={<Posts />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </Suspense>
  </Html>
);

export default App;
