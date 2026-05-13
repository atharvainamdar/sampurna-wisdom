import { AdminChrome } from '@/components/admin-chrome';

const days = Array.from({ length: 35 }, (_, index) => {
  const date = index + 1;
  const status = date % 7 === 0 ? 'empty' : date % 5 === 0 ? 'draft' : date < 14 ? 'published' : 'scheduled';
  return { date, status };
});

export default function AdminCalendarPage() {
  return (
    <AdminChrome title="Content calendar" eyebrow="Plan daily wisdom">
      <section className="admin-board single-board">
        <div className="admin-panel">
          <div className="calendar-grid">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => <b key={day}>{day}</b>)}
            {days.map((day) => <button className={`calendar-day ${day.status}`} key={day.date}><span>{day.date}</span><small>{day.status}</small></button>)}
          </div>
        </div>
      </section>
    </AdminChrome>
  );
}
