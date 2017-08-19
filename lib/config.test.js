import { schema } from './config';

describe('config/schema', () => {
  it('matches expected schema', () => {
    expect(schema).toMatchSnapshot();
  });
});
