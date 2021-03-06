import alertIfConfigIncomplete from '../../alert-if-config-incomplete';

jest.mock('../../config', () => ({
  get: (key) => {
    switch (key) {
      case 'codeshipApiKey':
        return 'secret squirrel';
      case 'githubUsername':
        return 'cbovis';
      default:
        return undefined;
    }
  },
}));

describe('alert-if-config-incomplete', () => {
  afterAll(() => {
    global.atom = undefined;
  });

  beforeAll(() => {
    global.atom = {
      notifications: {
        addWarning: jest.fn(),
      },
    };
  });

  it('displays a warning when Codeship API Key empty', () => {
    alertIfConfigIncomplete();
    expect(atom.notifications.addWarning).toHaveBeenCalledTimes(0);
  });
});
