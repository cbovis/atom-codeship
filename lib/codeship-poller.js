'use babel';

import { get as getConfig } from './config';
import { CONFIG_KEY_POLLING_INTERVAL } from './constants';
import { addError } from './codeship-notifications';

let timeout;
let initialised;

const startPolling = () => {
  if (!initialised) {
    initialised = Date.now();
  }

  const interval = getConfig(CONFIG_KEY_POLLING_INTERVAL) * 1000;

  timeout = setTimeout(() => {
    addError({
      branch: 'refactor-change-cover-validation',
      build: {
        id: 27701338,
      },
      project: {
        id: 180850,
        name: 'ahmdigital/ahm-members',
      },
    });
    startPolling();
  }, interval);
};

const stopPolling = () => {
  if (timeout) {
    clearTimeout(timeout);
  }

  initialised = undefined;
};

export { startPolling, stopPolling };
