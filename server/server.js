/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

import render, { SERVER_PORT } from './render';

import express from 'express';
import compress from 'compression';
import { readFileSync } from 'fs';
import path from 'path';
import { JS_BUNDLE_DELAY } from './delays';

const PORT = process.env.PORT || SERVER_PORT;
const app = express();

app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    // Artificially delay serving JS
    // to demonstrate streaming HTML.
    console.log('bundle is served:', req.url);
    setTimeout(next, JS_BUNDLE_DELAY);
  } else {
    next();
  }
});

app.use(compress());

app.use(express.static('build'));
app.use(express.static('public'));

app.get(
  '/*',
  handleErrors(async function (req, res) {
    await waitForWebpack();
    render(req.url, res);
  }),
);

app
  .listen(PORT, () => {
    console.log(`Listening at ${PORT}...`);
  })
  .on('error', function (error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const isPipe = portOrPipe => Number.isNaN(portOrPipe);
    const bind = isPipe(PORT) ? 'Pipe ' + PORT : 'Port ' + PORT;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

function handleErrors(fn) {
  return async function (req, res, next) {
    try {
      return await fn(req, res);
    } catch (x) {
      next(x);
    }
  };
}

async function waitForWebpack() {
  while (true) {
    try {
      readFileSync(path.resolve(__dirname, '../build/bundle.js'));
      return;
    } catch (err) {
      console.log('Could not find webpack build output. Will retry in a second...');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}
