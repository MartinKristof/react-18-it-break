/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
// import { renderToString } from 'react-dom/server';
import { renderToPipeableStream } from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import { StaticRouter } from 'react-router-dom/server';
import App from '../src/App';
import { DataProvider } from '../src/data';
import { API_DELAY, ABORT_DELAY } from './delays';

const ASSETS_MANIFEST_FILE_PATH = 'client/assets-manifest.json';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const STATIC_PORT = 4000;

export const SERVER_PORT = 3000;

// In a real setup, you'd read it from webpack build stats.
const getAssetsURL = () => (IS_PRODUCTION ? `http://localhost:${SERVER_PORT}` : `http://localhost:${STATIC_PORT}`);

const getAssets = () => {
  if (!IS_PRODUCTION) {
    return {
      clientJs: `${getAssetsURL()}/scripts/main.js`,
      clientCss: `${getAssetsURL()}/main.css`,
    };
  }

  try {
    const assets = JSON.parse(fs.readFileSync(path.join(__dirname, '../build/', ASSETS_MANIFEST_FILE_PATH)).toString());

    return {
      clientJs: `${getAssetsURL()}/client/${assets['main.js']}`,
      clientCss: `${getAssetsURL()}/main.css`,
    };
  } catch (error) {
    console.error('Unable to load asset manifest file', error);

    return { clientJs: '', clientCss: '' };
  }
};

const assets = getAssets();
const render = (url, res) => {
  // This is how you would wire it up previously:

  // const data = createServerData();
  // res.send(
  //     '<!DOCTYPE html>' +
  //         renderToString(
  //             <DataProvider data={data}>
  //                 <App assets={assets} />
  //             </DataProvider>,
  //         ),
  // );

  // // The new wiring is a bit more involved.
  res.socket.on('error', error => {
    console.error('Fatal', error);
  });

  let didError = false;
  const data = createServerData();
  const stream = renderToPipeableStream(
    <StaticRouter location={url}>
      <DataProvider data={data}>
        <App assets={assets} />
      </DataProvider>
    </StaticRouter>,
    res,
    {
      bootstrapScripts: [assets.clientJs],
      onShellReady() {
        // The content above all Suspense boundaries is ready.
        // If something errored before we started streaming, we set the error code appropriately.
        res.statusCode = didError ? 500 : 200;
        res.setHeader('Content-type', 'text/html');
        stream.pipe(res);
      },
      onError(x) {
        didError = true;
        console.error(x);
      },
    },
  );
  stream.pipe(res, { end: false });
  res.flush();
  setTimeout(() => stream.abort(), ABORT_DELAY);
  // Abandon and switch to client rendering if enough time passes.
  // Try lowering this to see the client recover.
};

// Simulate a delay caused by data fetching.
// We fake this because the streaming HTML renderer
// is not yet integrated with real data fetching strategies.
const createServerData = () => {
  let done = false;
  let promise = null;
  return {
    read() {
      if (done) {
        return;
      }
      if (promise) {
        throw promise;
      }
      promise = new Promise(resolve => {
        setTimeout(() => {
          done = true;
          promise = null;
          resolve();
        }, API_DELAY);
      });
      throw promise;
    },
  };
};

export default render;
