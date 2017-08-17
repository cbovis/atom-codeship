'use babel';

import { schema as configSchema } from './config';
import { startPolling, stopPolling } from './codeship-poller';

class Package {
  constructor() {
    this.config = configSchema;
  }

  activate() {
    startPolling();
  }

  deactivate() {
    stopPolling();
  }
}

export default new Package();
