import React from 'react'
import { useAppointments } from '../hooks/useAppointments'
import { useDoctors } from '../hooks/useDoctors'
import Card from '../components/Card'
import Avatar from '../components/Avatar'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { data: appts = [], isLoading: isLoadingAppts } = useAppointments()
  const { data: doctors = [], isLoading: isLoadingDocs } = useDoctors()
  const upcoming = appts.filter(a => a.status === 'upcoming')

  return (
    <div className="dashboard-layout">
      {/* Hero Section */}
      <div style={{ 
        position: 'relative', 
        borderRadius: 'var(--radius-lg)', 
        overflow: 'hidden', 
        marginBottom: '2rem',
        height: '240px'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200&h=400" 
          alt="Modern Hospital Hallway" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: 'linear-gradient(to right, rgba(15, 23, 42, 0.8), transparent)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 3rem',
          color: 'white'
        }}>
          <h1 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '2.5rem' }}>Welcome to City General</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '500px', opacity: 0.9 }}>
            Your health is our priority. Manage your appointments, view lab results, and connect with specialists.
          </p>
        </div>
      </div>

      <div className="dashboard-grid">
        <Card title="Patient Overview">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="stat-card">
              <span className="muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Planned Visits</span>
              <span className="stat-value">{upcoming.length}</span>
            </div>
            <div className="stat-card">
              <span className="muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recent Labs</span>
              <span className="stat-value">2</span>
            </div>
          </div>
        </Card>

        <Card title="Schedule & Reminders">
          {isLoadingAppts ? (
            <div className="muted">Retrieving your schedule...</div>
          ) : upcoming.length > 0 ? (
            <ul style={{ listStyle: 'none' }}>
              {upcoming.map((a) => (
                <li key={a.id} style={{ 
                  padding: '1rem 0', 
                  borderBottom: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--success-color)' }} />
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{a.doctorName}</div>
                      <div className="muted" style={{ fontSize: '0.875rem' }}>{new Date(a.date).toLocaleDateString()} at {new Date(a.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                  </div>
                  <Link to="/appointments" className="nav-link" style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>VIEW</Link>
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <p className="muted" style={{ marginBottom: '1rem' }}>You have no upcoming appointments.</p>
              <Link to="/search" className="btn btn-primary" style={{ fontSize: '0.75rem' }}>Book a Consultation</Link>
            </div>
          )}
        </Card>

        <Card title="Quick Actions">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Link to="/search" style={{ textDecoration: 'none', textAlign: 'center', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-primary)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔍</div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>Find Doctor</div>
            </Link>
            <Link to="/records" style={{ textDecoration: 'none', textAlign: 'center', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-primary)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📋</div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>My Records</div>
            </Link>
            <Link to="/profile" style={{ textDecoration: 'none', textAlign: 'center', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-primary)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👤</div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>Profile</div>
            </Link>
            <div 
              onClick={() => alert('Support Ticket Created! A representative will contact you shortly.')}
              style={{ textAlign: 'center', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-primary)', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📞</div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>Help Desk</div>
            </div>
          </div>
        </Card>
      </div>

      <div style={{ marginTop: '2.5rem', backgroundColor: 'var(--bg-secondary)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border-color)' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>💡 Health Tip of the Day</h3>
        <p className="muted" style={{ fontSize: '0.875rem', margin: 0 }}>
          Staying hydrated throughout the day can significantly improve your focus and energy levels. Aim for at least 8 glasses of water.
        </p>
      </div>

      <div style={{ marginTop: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Meet Our Specialists</h2>
        <div style={{ 
          display: 'flex', 
          gap: '1.5rem', 
          overflowX: 'auto', 
          paddingBottom: '1rem',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          {!isLoadingDocs && doctors.slice(0, 6).map(d => (
            <div key={d.id} style={{ minWidth: '160px', textAlign: 'center' }}>
              <Avatar src={d.imageUrl} alt={d.name} size={120} shape="circle" className="specialist-avatar" />
              <div style={{ fontWeight: '600', fontSize: '0.875rem', marginTop: '0.75rem' }}>{d.name}</div>
              <div className="muted" style={{ fontSize: '0.75rem' }}>{d.specialty}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
