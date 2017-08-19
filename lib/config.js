'use babel';

import {
  CONFIG_KEY_POLLING_INTERVAL,
  CONFIG_KEY_CODESHIP_API_KEY,
  CONFIG_KEY_GITHUB_USERNAME,
} from './constants';

const config = {
  [CONFIG_KEY_CODESHIP_API_KEY]: {
    title: 'Codeship API Key',
    description:
      'Enter your codeship API key which can be found in the [account settings](https://app.codeship.com/user/edit).',
    type: 'string',
    default: '',
  },
  [CONFIG_KEY_GITHUB_USERNAME]: {
    title: 'GitHub Username',
    description: 'Enter your GitHub username so that we can identify your builds.',
    type: 'string',
    default: '',
  },
  [CONFIG_KEY_POLLING_INTERVAL]: {
    title: 'Polling Interval',
    description: 'Enter the interval (in seconds) on which to poll the build API.',
    type: 'integer',
    default: 15,
  },
};

const get = configKey => atom.config.get(`atom-codeship.${configKey}`);

export { config as schema };
export { get };
