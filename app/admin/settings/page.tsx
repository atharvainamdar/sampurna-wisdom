import { Settings } from 'lucide-react';
import { AdminChrome } from '@/components/admin-chrome';
import { BRAND } from '@/lib/content';

export default function AdminSettingsPage() {
  return (
    <AdminChrome title="Site settings" eyebrow={<><Settings size={15} /> Brand details</>}>
      <section className="admin-board single-board">
        <div className="admin-panel main-editor">
          <span className="section-kicker">Current public details</span>
          <h2>Website contact information</h2>
          <p className="admin-settings-note">These values are shown for review. To avoid accidental public mistakes, editing brand settings will be enabled separately after client approval.</p>
          <div className="field-grid settings-grid readonly-settings-grid">
            <label>YouTube channel <input value={BRAND.youtube} readOnly /></label>
            <label>WhatsApp number <input value={BRAND.whatsapp} readOnly /></label>
            <label>Email <input value={BRAND.email} readOnly /></label>
            <label>Public location <input value={BRAND.location} readOnly /></label>
          </div>
        </div>
      </section>
    </AdminChrome>
  );
}
