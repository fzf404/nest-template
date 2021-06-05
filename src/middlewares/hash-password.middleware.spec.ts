import { HashPasswordMiddleware } from './hash-password.middleware';

describe('HashPosswordMiddleware', () => {
  it('should be defined', () => {
    expect(new HashPasswordMiddleware()).toBeDefined();
  });
});
