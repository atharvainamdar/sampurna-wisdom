'use client';

import { useSyncExternalStore } from 'react';
import { WisdomPostForm } from '@/components/admin/wisdom-post-form';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function hasStoredAdminToken() {
  return Boolean(localStorage.getItem('sw-admin-token'));
}

export function AdminSessionFallbackEditor() {
  const hasToken = useSyncExternalStore(subscribe, hasStoredAdminToken, () => false);

  if (!hasToken) return null;

  return (
    <section className="admin-board single-board content-editor-board">
      <div className="admin-panel saved-posts-panel">
        <div className="editor-header-row">
          <div>
            <h2>Create daily wisdom</h2>
            <p>Your admin session is active in this browser. Use this simple editor to save content safely.</p>
          </div>
        </div>
      </div>
      <WisdomPostForm />
    </section>
  );
}
