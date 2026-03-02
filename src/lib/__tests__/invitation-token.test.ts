import {
  storeInvitationToken,
  getStoredInvitationToken,
  clearInvitationToken,
  consumeInvitationToken,
} from '../invitation-token';

const mockCookieStore = new Map<string, { value: string }>();

const mockCookies = {
  get: jest.fn((name: string) => mockCookieStore.get(name)),
  set: jest.fn((name: string, value: string, options: any) => {
    mockCookieStore.set(name, { value });
  }),
  delete: jest.fn((name: string) => {
    mockCookieStore.delete(name);
  }),
};

jest.mock('next/headers', () => ({
  cookies: () => mockCookies,
}));

describe('invitation-token', () => {
  beforeEach(() => {
    mockCookieStore.clear();
    jest.clearAllMocks();
  });

  describe('storeInvitationToken', () => {
    it('should store the invitation token in a cookie', async () => {
      const token = 'test_invitation_token_123';
      await storeInvitationToken(token);

      expect(mockCookies.set).toHaveBeenCalledWith(
        'workos_invitation_token',
        token,
        expect.objectContaining({
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
        })
      );
    });

    it('should set a 7-day expiration', async () => {
      const token = 'test_token';
      await storeInvitationToken(token);

      expect(mockCookies.set).toHaveBeenCalledWith(
        'workos_invitation_token',
        token,
        expect.objectContaining({
          maxAge: 60 * 60 * 24 * 7,
        })
      );
    });
  });

  describe('getStoredInvitationToken', () => {
    it('should return the stored token', async () => {
      mockCookieStore.set('workos_invitation_token', { value: 'stored_token' });

      const result = await getStoredInvitationToken();
      expect(result).toBe('stored_token');
    });

    it('should return undefined if no token is stored', async () => {
      const result = await getStoredInvitationToken();
      expect(result).toBeUndefined();
    });
  });

  describe('clearInvitationToken', () => {
    it('should delete the cookie', async () => {
      mockCookieStore.set('workos_invitation_token', { value: 'to_delete' });

      await clearInvitationToken();

      expect(mockCookies.delete).toHaveBeenCalledWith('workos_invitation_token');
    });
  });

  describe('consumeInvitationToken', () => {
    it('should return the token and clear it', async () => {
      mockCookieStore.set('workos_invitation_token', { value: 'consume_me' });

      const result = await consumeInvitationToken();

      expect(result).toBe('consume_me');
      expect(mockCookies.delete).toHaveBeenCalledWith('workos_invitation_token');
    });

    it('should return undefined if no token exists', async () => {
      const result = await consumeInvitationToken();

      expect(result).toBeUndefined();
      expect(mockCookies.delete).not.toHaveBeenCalled();
    });
  });
});

describe('invitation token flow simulation', () => {
  beforeEach(() => {
    mockCookieStore.clear();
    jest.clearAllMocks();
  });

  it('should persist token through multiple page navigations', async () => {
    const invitationToken = 'Z1uX3RbwcIl5fIGJJJCXXisdI';

    // User lands on page with invitation_token
    await storeInvitationToken(invitationToken);

    // Simulate navigation to password reset page
    // Token should still be retrievable
    const tokenAfterNavigation = await getStoredInvitationToken();
    expect(tokenAfterNavigation).toBe(invitationToken);

    // User completes password reset and signs in
    // Token is consumed during authentication
    const tokenForAuth = await consumeInvitationToken();
    expect(tokenForAuth).toBe(invitationToken);

    // Token should be cleared after consumption
    const tokenAfterAuth = await getStoredInvitationToken();
    expect(tokenAfterAuth).toBeUndefined();
  });

  it('should handle the case where user lands without invitation token', async () => {
    // User lands on sign-in page without invitation token
    const token = await getStoredInvitationToken();
    expect(token).toBeUndefined();

    // Authentication should work without invitation token
    const tokenForAuth = await consumeInvitationToken();
    expect(tokenForAuth).toBeUndefined();
  });

  it('should overwrite existing token if user receives new invitation', async () => {
    const firstToken = 'first_invitation_token';
    const secondToken = 'second_invitation_token';

    // First invitation
    await storeInvitationToken(firstToken);
    expect(await getStoredInvitationToken()).toBe(firstToken);

    // Second invitation (overwrites first)
    await storeInvitationToken(secondToken);
    expect(await getStoredInvitationToken()).toBe(secondToken);
  });
});
