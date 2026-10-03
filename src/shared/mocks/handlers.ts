import { http, HttpResponse } from 'msw';

const mockUsers = new Map([
  [
    'user@example.com',
    { id: '1', email: 'user@example.com', displayName: 'Test User', password: 'password123' },
  ],
  [
    'admin@example.com',
    { id: '2', email: 'admin@example.com', displayName: 'Admin User', password: 'admin123' },
  ],
]);

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json();
    const { email, password } = body as { email: string; password: string };

    await new Promise(resolve => setTimeout(resolve, 500));

    const user = mockUsers.get(email.toLowerCase());
    if (!user || user.password !== password) {
      return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const { password: _, ...userWithoutPassword } = user;
    return HttpResponse.json(
      { user: userWithoutPassword },
      {
        headers: {
          'Set-Cookie': `session=mock-session-token; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`,
        },
      }
    );
  }),

  http.get('/api/auth/me', ({ request }) => {
    const cookie = request.headers.get('Cookie');
    if (!cookie?.includes('session=')) {
      return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = mockUsers.get('user@example.com');
    if (!user) {
      return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const { password: _, ...userWithoutPassword } = user;
    return HttpResponse.json({ user: userWithoutPassword });
  }),

  http.post('/api/auth/logout', () => {
    return new HttpResponse(null, {
      status: 204,
      headers: {
        'Set-Cookie': 'session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0',
      },
    });
  }),
];
