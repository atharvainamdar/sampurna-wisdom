'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setMessage(error.message);
        return;
      }

      router.push('/admin/content');
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="login-card" onSubmit={onSubmit}>
      <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
      <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
      <button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
      {message ? <p>{message}</p> : null}
    </form>
  );
}
