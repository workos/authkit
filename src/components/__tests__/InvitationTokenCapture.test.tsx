import { render, waitFor } from '@testing-library/react';
import { InvitationTokenCapture } from '../InvitationTokenCapture';

const mockStoreInvitationToken = jest.fn();

jest.mock('@/lib/invitation-token', () => ({
  storeInvitationToken: (...args: any[]) => mockStoreInvitationToken(...args),
}));

const mockSearchParams = new Map<string, string>();

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: (key: string) => mockSearchParams.get(key),
  }),
}));

describe('InvitationTokenCapture', () => {
  beforeEach(() => {
    mockSearchParams.clear();
    mockStoreInvitationToken.mockClear();
  });

  it('should store invitation token when present in URL', async () => {
    const token = 'test_invitation_token_xyz';
    mockSearchParams.set('invitation_token', token);

    render(<InvitationTokenCapture />);

    await waitFor(() => {
      expect(mockStoreInvitationToken).toHaveBeenCalledWith(token);
    });
  });

  it('should not call storeInvitationToken when no token in URL', async () => {
    render(<InvitationTokenCapture />);

    await waitFor(() => {
      expect(mockStoreInvitationToken).not.toHaveBeenCalled();
    });
  });

  it('should handle different token values', async () => {
    const tokens = ['Z1uX3RbwcIl5fIGJJJCXXisdI', 'abc123', 'invitation_test_456'];

    for (const token of tokens) {
      mockSearchParams.set('invitation_token', token);
      mockStoreInvitationToken.mockClear();

      const { unmount } = render(<InvitationTokenCapture />);

      await waitFor(() => {
        expect(mockStoreInvitationToken).toHaveBeenCalledWith(token);
      });

      unmount();
    }
  });

  it('should render nothing (null)', () => {
    const { container } = render(<InvitationTokenCapture />);
    expect(container.firstChild).toBeNull();
  });
});
