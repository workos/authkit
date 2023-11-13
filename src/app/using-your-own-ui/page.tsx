import Link from 'next/link';

export default function UsingYourOwnUi() {
  return (
    <main>
      <h1>Using your own UI</h1>

      <h2>Sign-up</h2>
      <ul>
        <li>
          <Link href="/using-your-own-ui/sign-up/email-password">Email + Password</Link>
        </li>
        <li>
          <Link href="/using-your-own-ui/sign-up/magic-auth">Magic Auth</Link>
        </li>
      </ul>

      <h2>Sign-in</h2>
      <ul>
        <li>
          <Link href="/using-your-own-ui/sign-in/email-password">Email + Password</Link>
        </li>
        <li>
          <Link href="/using-your-own-ui/sign-in/magic-auth">Magic Auth</Link>
        </li>
        <li>
          <Link href="/using-your-own-ui/sign-in/google-oauth">Google OAuth</Link>
        </li>
        <li>
          <Link href="/using-your-own-ui/sign-in/microsoft-oauth">Microsoft OAuth</Link>
        </li>
        <li>
          <Link href="/using-your-own-ui/sign-in/sso">Single Sign-On</Link>
        </li>
      </ul>

      <h2>Other</h2>
      <ul>
        <li>
          <Link href="/using-your-own-ui/mfa">Multi-Factor Auth</Link>
        </li>
        <li>
          <Link href="/using-your-own-ui/verify-email">Verify email</Link>
        </li>
        <li>
          <Link href="/using-your-own-ui/reset-password">Reset password</Link>
        </li>
        <li>
          <Link href="/using-your-own-ui/users-table">Users table</Link>
        </li>
      </ul>
    </main>
  );
}
