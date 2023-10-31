import { signIn } from './sign-in';

export default function EmailPasswordExamplePage() {
  return (
    <main>
      <h1>Email + Password example</h1>

      <form className="inline-flex flex-col gap-3" action={signIn}>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <button type="submit">Sign in</button>
      </form>
    </main>
  );
}
