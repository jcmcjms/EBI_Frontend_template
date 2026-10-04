import { type Credentials } from '../auth-validation';

export interface AuthenticatedUser {
  id: string;
  email: string;
  displayName: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export type SignInResult =
  | { status: 'success'; user: AuthenticatedUser }
  | { status: 'invalid-credentials' }
  | { status: 'rate-limited'; retryAfterSeconds: number | null }
  | { status: 'unavailable' };

interface LoginResponsePayload {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

const TOKEN_STORAGE_KEY = 'ebi_auth_token';
const REFRESH_TOKEN_STORAGE_KEY = 'ebi_refresh_token';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '';
const PASSWORD_LOGIN_PATH = '/auth/login';
const REFRESH_TOKEN_PATH = '/auth/refresh';
const GET_PROFILE_PATH = '/auth/me';

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
}

export function setTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
}

export function clearTokens(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
}

function createAuthHeaders(): HeadersInit {
  const token = getAccessToken();
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await fetch(`${apiBaseUrl}${REFRESH_TOKEN_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      clearTokens();
      return false;
    }

    const data = (await response.json()) as TokenResponse;
    setTokens(data.accessToken, data.refreshToken);
    return true;
  } catch {
    clearTokens();
    return false;
  }
}

export async function signInWithPassword(credentials: Credentials): Promise<SignInResult> {
  let response: Response | null;
  try {
    response = await fetch(`${apiBaseUrl}${PASSWORD_LOGIN_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        emailOrUsername: credentials.email,
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
  if (!payload?.accessToken || !payload?.refreshToken) return { status: 'unavailable' };

  setTokens(payload.accessToken, payload.refreshToken);

  // Fetch user profile after successful login
  const user = await fetchCurrentUser();
  if (!user) return { status: 'unavailable' };

  return { status: 'success', user };
}

export async function fetchCurrentUser(): Promise<AuthenticatedUser | null> {
  try {
    let response = await fetch(`${apiBaseUrl}${GET_PROFILE_PATH}`, {
      headers: createAuthHeaders(),
    });

    // If token expired, try to refresh
    if (response.status === 401) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        response = await fetch(`${apiBaseUrl}${GET_PROFILE_PATH}`, {
          headers: createAuthHeaders(),
        });
      } else {
        clearTokens();
        return null;
      }
    }

    if (!response.ok) return null;

    const data = (await response.json().catch(() => null)) as {
      id: string;
      email: string;
      displayName: string;
    } | null;
    if (!data) return null;

    return {
      id: data.id,
      email: data.email,
      displayName: data.displayName,
    };
  } catch {
    return null;
  }
}

export function redirectToGithubLogin(): void {
  window.location.assign(`${apiBaseUrl}/auth/providers/github/login`);
}

function parseRetryAfterSeconds(response: Response): number | null {
  const header = response.headers.get('Retry-After');
  if (header === null) return null;
  const seconds = Number(header);
  return Number.isFinite(seconds) ? seconds : null;
}
