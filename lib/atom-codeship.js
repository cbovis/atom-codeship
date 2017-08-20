'use babel';

import { schema as configSchema } from './config';
import { startPolling, stopPolling } from './codeship-poller';

export default {
  activate() {
    startPolling();
  },
  config: configSchema,
  deactivate() {
    stopPolling();
  },
};
