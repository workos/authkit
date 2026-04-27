import { NextRequest, NextResponse } from 'next/server';
import {
  storeInvitationToken,
  getStoredInvitationToken,
  consumeInvitationToken,
  clearInvitationToken,
} from '@/lib/invitation-token';

export async function GET(request: NextRequest) {
  const action = request.nextUrl.searchParams.get('action');
  const token = request.nextUrl.searchParams.get('token');

  try {
    switch (action) {
      case 'store':
        if (!token) {
          return NextResponse.json({ error: 'Token required for store action' }, { status: 400 });
        }
        await storeInvitationToken(token);
        return NextResponse.json({ success: true, action: 'stored', token });

      case 'get':
        const storedToken = await getStoredInvitationToken();
        return NextResponse.json({ success: true, action: 'get', token: storedToken || null });

      case 'consume':
        const consumedToken = await consumeInvitationToken();
        return NextResponse.json({ success: true, action: 'consumed', token: consumedToken || null });

      case 'clear':
        await clearInvitationToken();
        return NextResponse.json({ success: true, action: 'cleared' });

      default:
        return NextResponse.json({
          error: 'Invalid action. Use: store, get, consume, or clear',
          usage: {
            store: '/api/test-invitation-token?action=store&token=YOUR_TOKEN',
            get: '/api/test-invitation-token?action=get',
            consume: '/api/test-invitation-token?action=consume',
            clear: '/api/test-invitation-token?action=clear',
          },
        }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
