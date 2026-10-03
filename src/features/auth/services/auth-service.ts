import { normalizeEmail, type Credentials } from '../auth-validation';

export interface AuthenticatedUser {
  id: string;
  email: string;
  displayName: string;
}

export type SignInResult =
  | { status: 'success'; user: AuthenticatedUser }
  | { status: 'invalid-credentials' }
  | { status: 'rate-limited'; retryAfterSeconds: number | null }
  | { status: 'unavailable' };

interface LoginResponsePayload {
  user?: AuthenticatedUser;
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '';
const PASSWORD_LOGIN_PATH = '/api/auth/login';
const GITHUB_LOGIN_PATH = '/api/auth/providers/github/login';

export async function signInWithPassword(credentials: Credentials): Promise<SignInResult> {
  let response: Response | null;
  try {
    // Session arrives as an HttpOnly/Secure/SameSite=Strict cookie set by the API;
    // a same-origin fetch carries it automatically — nothing sensitive is stored client-side.
    response = await fetch(`${apiBaseUrl}${PASSWORD_LOGIN_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        email: normalizeEmail(credentials.email),
        password: credentials.password,
      }),
    });
  } catch {
    return { status: 'unavailable' };
  }

  if (response.status === 401) return { status: 'invalid-credentials' };
  if (response.status === 429) {
    return { status: 'rate-limited', retryAfterSeconds: parseRetryAfterSeconds(response) };
  }
  if (!response.ok) return { status: 'unavailable' };

  const payload = (await response.json().catch(() => null)) as LoginResponsePayload | null;
  if (payload?.user === undefined) return { status: 'unavailable' };
  return { status: 'success', user: payload.user };
}

export function redirectToGithubLogin(): void {
  // Server-driven OAuth: state/PKCE and the client secret stay on the API side.
  window.location.assign(`${apiBaseUrl}${GITHUB_LOGIN_PATH}`);
}

function parseRetryAfterSeconds(response: Response): number | null {
  const header = response.headers.get('Retry-After');
  if (header === null) return null;
  const seconds = Number(header);
  return Number.isFinite(seconds) ? seconds : null;
}
