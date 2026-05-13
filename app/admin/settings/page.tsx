import { AdminChrome } from '@/components/admin-chrome';
import { BRAND } from '@/lib/content';

export default function AdminSettingsPage() {
  return (
    <AdminChrome title="Site settings" eyebrow="Brand and community links">
      <section className="admin-board single-board">
        <div className="admin-panel main-editor">
          <h2>Keep public details updated</h2>
          <div className="field-grid settings-grid">
            <label>YouTube channel <input defaultValue={BRAND.youtube} /></label>
            <label>WhatsApp number <input defaultValue={BRAND.whatsapp} /></label>
            <label>Email <input defaultValue={BRAND.email} /></label>
            <label className="wide">Homepage announcement <textarea defaultValue="New daily wisdom unlocks every morning at 6 AM." /></label>
          </div>
        </div>
      </section>
    </AdminChrome>
  );
}
