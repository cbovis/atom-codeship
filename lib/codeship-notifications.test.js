import { addError } from './codeship-notifications';

describe('codeship-notifications/add-error', () => {
  beforeAll(() => {
    global.atom = {
      notifications: {
        addError: jest.fn(),
      },
    };
  });

  afterAll(() => {
    global.atom = undefined;
  });

  it('adds error notification to atom', () => {
    addError({
      project: {
        id: '123',
        name: 'test',
      },
      branch: 'test-feature',
      build: {
        id: 'abc',
      },
      commit: {
        message: 'making some changes',
      },
    });

    expect(atom.notifications.addError).toHaveBeenCalledTimes(1);
  });
});
