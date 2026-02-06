import React from 'react'
import { useAuth } from '../hooks/useAuth'
import Card from '../components/Card'
import Avatar from '../components/Avatar'

export default function Profile() {
  const { user, logout } = useAuth()

  return (
    <div className="profile-layout" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1>Patient Profile</h1>
        <p className="muted">Manage your personal information and account settings.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <section>
          <Card>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <Avatar 
                src={user?.avatar || 'https://randomuser.me/api/portraits/women/68.jpg'} 
                alt={user?.name || 'Prachi Verma'} 
                size={120} 
                shape="circle" 
                style={{ margin: '0 auto 1rem' }}
              />
              <h3>{user?.name || 'Prachi Verma'}</h3>
              <p className="muted" style={{ fontSize: '0.875rem' }}>Patient ID: {user?.id || 'P-12345'}</p>
            </div>
            <button onClick={logout} className="btn btn-secondary" style={{ width: '100%' }}>Sign Out</button>
          </Card>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card title="Personal Information">
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label className="muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Full Name</label>
                <div style={{ fontWeight: '500' }}>{user?.name || 'Prachi Verma'}</div>
              </div>
              <div>
                <label className="muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Email Address</label>
                <div style={{ fontWeight: '500' }}>{user?.email}</div>
              </div>
              <div>
                <label className="muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Account Established</label>
                <div style={{ fontWeight: '500' }}>January 20, 2026</div>
              </div>
            </div>
          </Card>

          <Card title="Health Settings">
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem' }}>Email Notifications</span>
                <span style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>Enabled</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem' }}>SMS Reminders</span>
                <span style={{ color: 'var(--text-muted)' }}>Disabled</span>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
