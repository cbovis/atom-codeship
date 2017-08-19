import { flatMap } from 'lodash';
import fetch from 'node-fetch';
import moment from 'moment';

export const getFailedBuilds = (apiKey, githubUsername, sinceDate) =>
  fetch(`https://codeship.com/api/v1/projects.json?api_key=${apiKey}`)
    .then(res => res.json())
    .then((json) => {
      const builds = flatMap(json.projects, project => project.builds).filter(
        build =>
          build.github_username === githubUsername &&
          build.status === 'error' &&
          moment(build.finished_at).isSameOrAfter(sinceDate),
      );

      return builds.map(build => ({
        branch: build.branch,
        build: {
          id: build.id,
        },
        commit: {
          message: build.message,
        },
        endDate: build.finished_at,
        project: {
          id: build.project_id,
          name: json.projects.find(project => project.id === build.project_id).repository_name,
        },
      }));
    });
