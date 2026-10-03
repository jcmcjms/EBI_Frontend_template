export interface Credentials {
  email: string;
  password: string;
}

export type CredentialsFieldErrors = Partial<Record<keyof Credentials, string>>;

const EMAIL_MAX_LENGTH = 254;
const PASSWORD_MAX_LENGTH = 128;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function validateCredentials(credentials: Credentials): CredentialsFieldErrors {
  const errors: CredentialsFieldErrors = {};
  const email = normalizeEmail(credentials.email);

  if (email.length === 0) {
    errors.email = 'Email is required.';
  } else if (email.length > EMAIL_MAX_LENGTH || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (credentials.password.length === 0) {
    errors.password = 'Password is required.';
  } else if (credentials.password.length > PASSWORD_MAX_LENGTH) {
    errors.password = `Password must be ${PASSWORD_MAX_LENGTH} characters or fewer.`;
  }

  return errors;
}

export function hasErrors(errors: CredentialsFieldErrors): boolean {
  return Object.values(errors).some(message => message !== undefined);
}
