import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Input from '../components/Input'
import Button from '../components/Button'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const auth = useAuth()
  const nav = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      await auth.register({ name, email, password })
      nav('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>Create Account</h2>
          <p className="muted" style={{ fontSize: '0.875rem' }}>Join the portal to manage your health records.</p>
        </div>

        <form onSubmit={handleSubmit} aria-label="register form">
          <Input 
            id="name" 
            label="Full Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="John Doe"
            required 
          />
          <Input 
            id="email" 
            label="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="name@example.com"
            required 
          />
          <Input 
            id="password" 
            label="Create Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            type="password" 
            placeholder="••••••••"
            required 
          />
          
          {error && (
            <div style={{ 
              padding: '0.75rem', 
              backgroundColor: 'rgba(239, 68, 68, 0.1)', 
              color: 'var(--error-color)', 
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <Button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1.5rem' }}>
            Create Account
          </Button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.875rem' }} className="muted">
          Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '600', textDecoration: 'none' }}>Sign in</Link>
        </div>
      </div>
    </div>
  )
}
