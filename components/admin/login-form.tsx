type LoginFormProps = { message?: string };

export function LoginForm({ message }: LoginFormProps) {
  return (
    <form className="login-card" action="/admin/login/auth" method="post">
      <label>Email<input name="email" type="email" required /></label>
      <label>Password<input name="password" type="password" required /></label>
      <button type="submit">Sign in</button>
      {message ? <p>{message}</p> : null}
    </form>
  );
}
