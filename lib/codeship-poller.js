import { isEmpty } from 'lodash';
import moment from 'moment';

import { get as getConfig } from './config';
import {
  CONFIG_KEY_CODESHIP_API_KEY,
  CONFIG_KEY_GITHUB_USERNAME,
  CONFIG_KEY_POLLING_INTERVAL,
} from './constants';
import { addError } from './codeship-notifications';
import { getFailedBuilds } from './codeship-api';

let timeout;
let fromDate;

const startPolling = () => {
  fromDate = moment.utc();

  const interval = getConfig(CONFIG_KEY_POLLING_INTERVAL) * 1000;
  const apiKey = getConfig(CONFIG_KEY_CODESHIP_API_KEY);
  const githubUsername = getConfig(CONFIG_KEY_GITHUB_USERNAME);

  timeout = setTimeout(() => {
    if (isEmpty(apiKey) || isEmpty(githubUsername)) {
      return;
    }

    getFailedBuilds(apiKey, githubUsername, fromDate)
      .then((builds) => {
        builds.forEach((build) => {
          addError(build);
        });

        startPolling();
      })
      .catch((err) => {
        throw err;
      });
  }, interval);
};

const stopPolling = () => {
  clearTimeout(timeout);
};

export { startPolling, stopPolling };
