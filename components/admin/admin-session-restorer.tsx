'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function hasStoredAdminToken() {
  return Boolean(localStorage.getItem('sw-admin-token'));
}

export function AdminSessionRestorer() {
  const hasToken = useSyncExternalStore(subscribe, hasStoredAdminToken, () => false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!hasToken) return;

    const token = localStorage.getItem('sw-admin-token');
    if (!token) return;

    let cancelled = false;

    fetch('/admin/session/restore', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'same-origin',
    })
      .then((response) => {
        if (!response.ok) throw new Error('restore failed');
        if (!cancelled) window.location.reload();
      })
      .catch(() => {
        localStorage.removeItem('sw-admin-token');
        sessionStorage.removeItem('sw-admin-restored');
        window.dispatchEvent(new Event('storage'));
        if (!cancelled) setFailed(true);
      });

    return () => { cancelled = true; };
  }, [hasToken]);

  if (!hasToken && !failed) return null;

  return (
    <section className="admin-board single-board content-editor-board">
      <div className="admin-panel saved-posts-panel">
        <div className="editor-header-row">
          <div>
            <h2>{failed ? 'Please sign in again' : 'Restoring admin session'}</h2>
            <p>{failed ? 'Your previous session expired. Sign in once more, then navigation will stay active.' : 'One moment — reconnecting your admin login so you can move between pages without being signed out.'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
