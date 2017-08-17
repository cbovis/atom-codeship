'use babel';

import openUrl from 'opn';

const buildCodeshipUrl = (projectId, buildId) =>
  `https://app.codeship.com/projects/${projectId}/builds/${buildId}`;

const addError = ({ project, branch, build, endDate }) => {
  atom.notifications.addError(project.name, {
    buttons: [
      {
        onDidClick: () => {
          openUrl(buildCodeshipUrl(project.id, build.id));
          this.model.dismiss();
        },
        text: 'View Details',
      },
      {
        text: 'Dismiss',
        onDidClick() {
          this.model.dismiss();
        },
      },
    ],
    description: `**branch:** ${branch}`,
    detail: `The build for **${project.name}** failed 20 seconds ago, view details to find out why.`,
    dismissable: true,
    icon: 'alert',
  });
};

const addStart = () => {};
const addSuccess = () => {};

export { addError, addStart, addSuccess };
