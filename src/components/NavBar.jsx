import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function NavBar() {
  const { user, logout } = useAuth()

  return (
    <header className="navbar" role="banner">
      <div className="navbar-container">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" className="brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🏥</span>
            <span>CityGeneral<span style={{ fontWeight: '300', color: 'var(--text-secondary)' }}>Portal</span></span>
          </Link>
          <nav className="nav-links" aria-label="Main navigation">
            <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Dashboard</NavLink>
            <NavLink to="/search" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Find Doctors</NavLink>
            <NavLink to="/appointments" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>My Appointments</NavLink>
            <NavLink to="/records" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Medical Records</NavLink>
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link to="/profile" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ 
                  width: 32, 
                  height: 32, 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--primary-color)', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {user.name.charAt(0)}
                </div>
                <span className="nav-text-desktop">{user.name}</span>
              </Link>
              <button onClick={logout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Sign Out</button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to="/login" className="btn btn-secondary">Sign In</Link>
              <Link to="/register" className="btn btn-primary">Join Now</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
