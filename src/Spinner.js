/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';

const Spinner = ({ active = true }) => (
  <div
    className={['spinner', active && 'spinner--active'].join(' ')}
    aria-label="progress"
    role="progressbar"
    aria-busy={active ? 'true' : 'false'}
  />
);

export default Spinner;
