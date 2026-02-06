import React from 'react'
import { useAppointments } from '../hooks/useAppointments'
import Card from '../components/Card'
import { useNavigate } from 'react-router-dom'
import { doctors as doctorsList } from '../services/doctorsData'

export default function Appointments() {
  const { data: appts = [], isLoading } = useAppointments()
  const nav = useNavigate()

  function RescheduleButton({ appointment }) {
    const handle = () => {
      // Try to find the canonical doctor object by name; fall back to minimal info
      const doc = doctorsList.find(d => d.name === appointment.doctorName) || { name: appointment.doctorName }
      nav('/book', { state: { doctor: doc, initialTime: appointment.date, isReschedule: true } })
    }
    return (
      <button className="btn btn-secondary" style={{ fontSize: '0.75rem' }} onClick={handle}>Reschedule</button>
    )
  }

  const upcoming = appts
    .filter(a => new Date(a.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
  const past = appts
    .filter(a => new Date(a.date) <= new Date())
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="appointments-layout">
      <header style={{ marginBottom: '2rem' }}>
        <h1>My Appointments</h1>
        <p className="muted">Manage your upcoming visits and view your consultation history.</p>
      </header>

      {isLoading ? (
        <div className="muted">Loading your schedule...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem' }}>
          <section>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Upcoming Visits</h2>
            {upcoming.length > 0 ? (
              upcoming.map(a => (
                <Card key={a.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ color: 'var(--primary-color)', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                        Confirmed
                      </div>
                      <h3 style={{ marginBottom: '0.25rem' }}>{a.doctorName}</h3>
                      <div className="muted" style={{ fontSize: '0.875rem' }}>
                        {new Date(a.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {new Date(a.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <RescheduleButton appointment={a} />
                  </div>
                </Card>
              ))
            ) : (
              <Card>
                <p className="muted">No upcoming appointments found.</p>
              </Card>
            )}
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>History</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {past.map(a => (
                <div key={a.id} style={{ 
                  padding: '1rem', 
                  borderLeft: '2px solid var(--border-color)', 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderRadius: '0 var(--radius-md) var(--radius-md) 0'
                }}>
                  <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>{a.doctorName}</div>
                  <div className="muted" style={{ fontSize: '0.75rem' }}>{new Date(a.date).toLocaleDateString()}</div>
                </div>
              ))}
              {past.length === 0 && <p className="muted" style={{ fontSize: '0.875rem' }}>No past records.</p>}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
