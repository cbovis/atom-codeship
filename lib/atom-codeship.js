'use babel';

import { schema as configSchema } from './config';
import { startPolling, stopPolling } from './codeship-poller';
import alertIfConfigIncomplete from './alert-if-config-incomplete';

export default {
  activate() {
    alertIfConfigIncomplete();
    startPolling();
  },
  config: configSchema,
  deactivate() {
    stopPolling();
  },
};
