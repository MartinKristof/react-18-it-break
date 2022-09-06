/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
// import {renderToString} from 'react-dom/server';
import { renderToPipeableStream } from 'react-dom/server';
import App from '../src/App';
import { DataProvider } from '../src/data';
import { API_DELAY, ABORT_DELAY } from './delays';

// In a real setup, you'd read it from webpack build stats.
let assets = {
    'main.js': '/main.js',
    'main.css': '/main.css',
};

module.exports = function render(url, res) {
    // This is how you would wire it up previously:

    // res.send(
    //   '<!DOCTYPE html>' +
    //   renderToString(
    //     <DataProvider data={data}>
    //       <App assets={assets} />
    //     </DataProvider>,
    //   )
    // );

    // The new wiring is a bit more involved.
    res.socket.on('error', error => {
        console.error('Fatal', error);
    });
    let didError = false;
    const data = createServerData();
    const stream = renderToPipeableStream(
        <DataProvider data={data}>
            <App assets={assets} />
        </DataProvider>,
        res,
        {
            onShellReady() {
                // The content above all Suspense boundaries is ready.
                // If something errored before we started streaming, we set the error code appropriately.
                res.statusCode = didError ? 500 : 200;
                res.setHeader('Content-type', 'text/html');
                stream.pipe(res);
            },
            onShellError(error) {
                console.log(error);
                // Something errored before we could complete the shell so we emit an alternative shell.
                res.statusCode = 500;
                res.send('<!doctype html><p>Loading...</p><script src="clientrender.js"></script>');
            },
            onAllReady() {
                // If you don't want streaming, use this instead of onShellReady.
                // This will fire after the entire page content is ready.
                // You can use this for crawlers or static generation.
                // res.statusCode = didError ? 500 : 200;
                // res.setHeader('Content-type', 'text/html');
                // stream.pipe(res);
            },
            onError(x) {
                didError = true;
                console.error(x);
            },
        },
    );
    stream.pipe(res, { end: false });
    res.flush();
    // Abandon and switch to client rendering if enough time passes.
    // Try lowering this to see the client recover.
    setTimeout(() => stream.abort(), ABORT_DELAY);
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
