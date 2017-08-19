import { schema as configSchema } from './config';
import { startPolling, stopPolling } from './codeship-poller';

class Package {
  constructor() {
    this.config = configSchema;
  }

  // eslint-disable-next-line class-methods-use-this
  activate() {
    startPolling();
  }

  // eslint-disable-next-line class-methods-use-this
  deactivate() {
    stopPolling();
  }
}

export default new Package();
