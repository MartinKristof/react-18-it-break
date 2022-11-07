/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';

const Html = ({ assets, children, title }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
        crossOrigin="anonymous"
      />
      <link rel="shortcut icon" href="favicon.ico" />
      <link rel="stylesheet" href={assets.clientCss} />
      <title>{title}</title>
    </head>
    <body>
      <noscript
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `<b>Enable JavaScript to run this app.</b>`,
        }}
      />
      {children}
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `assetManifest = ${JSON.stringify(assets)};`,
        }}
      />
      <script async src={assets.clientJs} />
    </body>
  </html>
);

export default Html;
