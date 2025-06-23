// Configuration globale des tests
process.env.NODE_ENV = 'test';

describe('Setup', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});
