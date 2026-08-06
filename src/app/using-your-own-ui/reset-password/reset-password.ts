'use server';

// These are Next.js server actions.
//
// If your application is a single page app (SPA) with a separate backend you will need to:
// - create a backend endpoint to handle each request
// - adapt the code below in each of those endpoints
//
// Please also note that for the sake of simplicity, we return all errors here.
// In a real application, you should pay attention to which errors make it
// to the client for security reasons.

import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

// `sendPasswordResetEmail` was replaced by `createPasswordReset`. WorkOS still sends the
// password reset email itself; what changed is that the link's destination is no longer a
// per-call argument. Configure it once per environment as the AuthKit `passwordResetUrl`
// setting — for this example, point it at
// http://localhost:3000/using-your-own-ui/reset-password
//
// `createPasswordReset` also returns `passwordResetToken`. Never pass that back to the
// caller: anyone can submit anyone else's address here, so returning it would let a stranger
// reset an account they don't own. Receiving the email is what proves ownership, so the
// token must only ever travel that way.
//
// The development-only log below is a convenience for local work. The emailed link works on
// its own, so this block is safe to delete.
export async function sendReset(prevState: any, formData: FormData) {
  const email = String(formData.get('email'));

  try {
    const reset = await workos.userManagement.createPasswordReset({ email });

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[example] Password reset for ${reset.email} — in a real app, email this link:\n` +
          `  http://localhost:3000/using-your-own-ui/reset-password` +
          `?token=${encodeURIComponent(reset.passwordResetToken)}` +
          `&email=${encodeURIComponent(reset.email)}`
      );
    }
  } catch (error) {
    // Logged, not returned: a distinguishable failure would reveal which addresses have accounts.
    console.error('[example] Could not create a password reset:', error);
  }

  // Deliberately identical whether or not that address has an account.
  return { submitted: true };
}

export async function resetPassword(prevState: any, formData: FormData) {
  try {
    return await workos.userManagement.resetPassword({
      newPassword: String(formData.get('newPassword')),
      token: String(formData.get('token')),
    });
  } catch (error) {
    return { error: JSON.parse(JSON.stringify(error)) };
  }
}
