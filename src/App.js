/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Html from './Html';
import Spinner from './Spinner';
import Layout from './Layout';
import { Route, Routes } from 'react-router-dom';
import Error from './Error';
import Content from './Content';
import NotFound from './NotFound';
import Posts from './pages/Posts';
// const Posts = lazy(() => import('./pages/Posts' /* webpackPrefetch: true */));

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
