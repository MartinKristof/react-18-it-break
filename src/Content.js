import React, { lazy, Suspense } from 'react';

import Spinner from './Spinner';

const Comments = lazy(() => import('./Comments' /* webpackPrefetch: true */));
const Post = lazy(() => import('./Post' /* webpackPrefetch: true */));

const Content = () => (
  // throw new Error('Any error!');

  <div>
    <article className="post">
      <Suspense fallback={<Spinner />}>
        <Post />
      </Suspense>
      <section className="comments">
        <h2>Comments</h2>
        <Suspense fallback={<Spinner />}>
          <Comments />
        </Suspense>
      </section>
    </article>
  </div>
);

export default Content;
