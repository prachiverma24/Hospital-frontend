import React, { useState } from 'react'
import { useDoctors } from '../hooks/useDoctors'
import Input from '../components/Input'
import Card from '../components/Card'
import Avatar from '../components/Avatar'
import { Link } from 'react-router-dom'

export default function Search() {
  const [specialty, setSpecialty] = useState('')
  const [location, setLocation] = useState('')
  const { data: doctors = [], isLoading, refetch } = useDoctors({})

  async function handleSearch(e) {
    e?.preventDefault()
    refetch()
  }

  const filtered = doctors.filter(d => 
    d.specialty.toLowerCase().includes(specialty.toLowerCase()) && 
    d.location.toLowerCase().includes(location.toLowerCase())
  )

  return (
    <div className="search-layout">
      <header style={{ marginBottom: '2rem' }}>
        <h1>Find a Healthcare Provider</h1>
        <p className="muted">Search for specialists in your area and book an appointment online.</p>
      </header>

      <div className="page-card" style={{ marginBottom: '2rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end', maxWidth: 'none' }}>
          <Input 
            id="specialty" 
            label="Specialty" 
            value={specialty} 
            onChange={(e) => setSpecialty(e.target.value)} 
            placeholder="e.g. Cardiology"
            style={{ marginBottom: 0 }}
          />
          <Input 
            id="location" 
            label="Location" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            placeholder="e.g. New York"
            style={{ marginBottom: 0 }}
          />
          <button type="submit" className="btn btn-primary" style={{ height: '44px' }}>Search Providers</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {isLoading ? (
          <div className="muted">Looking for doctors...</div>
        ) : filtered.length > 0 ? (
          filtered.map(d => {
            console.log(`Doctor: ${d.name}, Image: ${d.imageUrl}`);
            return (
              <Card key={d.id}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <Avatar src={d.imageUrl} alt={d.name} size={80} />
                  <div>
                    <h3 style={{ marginBottom: '0.25rem', fontSize: '1.1rem' }}>{d.name}</h3>
                    <div style={{ color: 'var(--primary-color)', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>{d.specialty}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem' }} className="muted">
                      <span>📍</span> {d.location}
                    </div>
                  </div>
                </div>
                
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="muted" style={{ fontSize: '0.75rem' }}>
                    Next availability: <br/>
                    <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                      {new Date(d.availability[0]).toLocaleDateString()}
                    </span>
                  </div>
                  <Link to="/book" state={{ doctor: d }} className="btn btn-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>Book Visit</Link>
                </div>
              </Card>
            )
          })
        ) : (
          <div className="muted" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
            No providers found matching your criteria.
          </div>
        )}
      </div>
    </div>
  )
}
