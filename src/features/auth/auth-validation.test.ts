import { describe, expect, it } from 'vitest';
import { hasErrors, normalizeEmail, validateCredentials } from './auth-validation';

describe('normalizeEmail', () => {
  it('trims and lowercases', () => {
    expect(normalizeEmail('  User@Example.COM ')).toBe('user@example.com');
  });
});

describe('validateCredentials', () => {
  it('passes a well-formed credential pair', () => {
    expect(validateCredentials({ email: 'm@example.com', password: 'correct-horse' })).toEqual({});
  });

  it('flags a missing email', () => {
    expect(validateCredentials({ email: '   ', password: 'pw' }).email).toBeDefined();
  });

  it.each(['m@example', 'm@example.', 'm example.com', 'm@@example.com'])(
    'flags malformed email %s',
    email => {
      expect(validateCredentials({ email, password: 'pw' }).email).toBeDefined();
    }
  );

  it('flags an over-long email', () => {
    expect(
      validateCredentials({ email: `${'a'.repeat(250)}@example.com`, password: 'pw' }).email
    ).toBeDefined();
  });

  it('flags an empty password', () => {
    expect(validateCredentials({ email: 'm@example.com', password: '' }).password).toBeDefined();
  });

  it('flags an over-long password', () => {
    expect(
      validateCredentials({ email: 'm@example.com', password: 'x'.repeat(129) }).password
    ).toBeDefined();
  });

  it('reports error presence via hasErrors', () => {
    expect(hasErrors({})).toBe(false);
    expect(hasErrors({ email: 'required' })).toBe(true);
  });
});
