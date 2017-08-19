'use babel';

import moment from 'moment';
import openUrl from 'opn';

const addError = ({ project, branch, build, endDate, commit }) => {
  const relativeTime = moment(endDate).fromNow();

  atom.notifications.addError(`Build #${build.id} has failed`, {
    buttons: [
      {
        onDidClick() {
          openUrl(`https://app.codeship.com/projects/${project.id}/builds/${build.id}`);
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
    description: `**branch:** ${branch}<br />**commit:** ${commit.message}`,
    detail: `The build for ${project.name} failed ${relativeTime}, view details to find out why.`,
    dismissable: true,
    icon: 'alert',
  });
};

const addStart = () => {};
const addSuccess = () => {};

export { addError, addStart, addSuccess };
