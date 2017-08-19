'use babel';

import { flatMap, isEmpty } from 'lodash';
import fetch from 'node-fetch';
import moment from 'moment';

import { get as getConfig } from './config';
import {
  CONFIG_KEY_CODESHIP_API_KEY,
  CONFIG_KEY_GITHUB_USERNAME,
  CONFIG_KEY_POLLING_INTERVAL,
} from './constants';
import { addError } from './codeship-notifications';

let timeout;
let fromDate;

const startPolling = () => {
  fromDate = Date.now();

  const interval = getConfig(CONFIG_KEY_POLLING_INTERVAL) * 1000;
  const apiKey = getConfig(CONFIG_KEY_CODESHIP_API_KEY);
  const githubUsername = getConfig(CONFIG_KEY_GITHUB_USERNAME);

  timeout = setTimeout(() => {
    if (isEmpty(apiKey) || isEmpty(githubUsername)) {
      return;
    }

    fetch(`https://codeship.com/api/v1/projects.json?api_key=${apiKey}`)
      .then(res => res.json())
      .then((json) => {
        const builds = flatMap(json.projects, project => project.builds).filter(
          build =>
            build.github_username === githubUsername &&
            build.status === 'error' &&
            moment(build.finished_at).isAfter(fromDate),
        );

        builds.forEach((build) => {
          addError({
            branch: build.branch,
            build: {
              id: build.id,
            },
            commit: {
              message: build.message,
            },
            project: {
              id: build.project_id,
              name: json.projects.find(project => project.id === build.project_id).repository_name,
            },
          });
        });
      })
      .catch((err) => {
        throw err;
      });
    startPolling();
  }, interval);
};

const stopPolling = () => {
  clearTimeout(timeout);
};

export { startPolling, stopPolling };
