import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('hc_user')
      if (raw) {
        const parsed = JSON.parse(raw)
        // If an older starter 'Test User' exists, upgrade it to Prachi Verma with avatar
        if (parsed && parsed.name === 'Test User') {
          const upgraded = { id: parsed.id || 'u1', name: 'Prachi Verma', email: parsed.email || 'prachiverma24@navgurukul.org', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' }
          localStorage.setItem('hc_user', JSON.stringify(upgraded))
          return upgraded
        }
        return parsed
      }
      // No saved user: keep null (don't auto-login)
      return null
    } catch (e) {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem('hc_user', JSON.stringify(user))
    else localStorage.removeItem('hc_user')
  }, [user])

  function login({ email, password }) {
    // For starter, accept any non-empty credentials and return mock user
    if (!email) return Promise.reject(new Error('Email required'))
    const fakeUser = { id: 'u1', name: 'Prachi Verma', email, avatar: 'https://randomuser.me/api/portraits/women/68.jpg' }
    setUser(fakeUser)
    return Promise.resolve(fakeUser)
  }

  function register({ name, email, password }) {
    if (!email || !name) return Promise.reject(new Error('Missing fields'))
    const newUser = { id: 'u2', name, email }
    setUser(newUser)
    return Promise.resolve(newUser)
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
