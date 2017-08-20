'use babel';

import { isEmpty } from 'lodash';

import { get as getConfig } from './config';
import { CONFIG_KEY_CODESHIP_API_KEY, CONFIG_KEY_GITHUB_USERNAME } from './constants';

export default () => {
  const apiKey = getConfig(CONFIG_KEY_CODESHIP_API_KEY);
  const githubUsername = getConfig(CONFIG_KEY_GITHUB_USERNAME);

  if (isEmpty(apiKey) || isEmpty(githubUsername)) {
    atom.notifications.addWarning('Configuration Missing', {
      buttons: [
        {
          onDidClick() {
            atom.workspace.open('atom://config/packages/atom-codeship');
            this.model.dismiss();
          },
          text: 'Update Settings',
        },
      ],
      description:
        'To use the Atom Codeship package you need to provide your `Codeship API Key` and `GitHub Username`.<br /><br />You can update these in the package settings.<br /><br />',
      dismissable: true,
      icon: 'alert',
    });
  }
};
