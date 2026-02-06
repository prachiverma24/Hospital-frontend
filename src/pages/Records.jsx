import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchRecords } from '../services/api'
import Card from '../components/Card'

// Simple CSS Visualization for Vitals
const VitalChart = ({ value, max, color }) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '2px', marginTop: '8px' }}>
      <div style={{ 
        width: `${percentage}%`, 
        height: '100%', 
        backgroundColor: color, 
        borderRadius: '2px',
        transition: 'width 1s ease-out'
      }} />
    </div>
  );
};

export default function Records() {
  const { data: recs = [], isLoading } = useQuery({
    queryKey: ['records'],
    queryFn: () => fetchRecords(),
    staleTime: 1000 * 60 * 5,
  })

  return (
    <div className="records-layout">
      <header style={{ marginBottom: '2rem' }}>
        <h1>Medical Records</h1>
        <p className="muted">View your laboratory results and clinical vitals history.</p>
      </header>

      {isLoading ? (
        <div className="muted">Loading records...</div>
      ) : (
        <div className="records-list">
          {recs.map(r => (
            <Card key={r.id} title={`${r.title}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                <span style={{ 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '20px', 
                  fontSize: '0.75rem', 
                  fontWeight: '700',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-secondary)'
                }}>
                  {r.type}
                </span>
                <span className="muted" style={{ fontSize: '0.875rem' }}>{new Date(r.date).toLocaleDateString()}</span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
                {Object.entries(r.values).map(([key, value]) => {
                  const isGlucose = key.toLowerCase().includes('glucose');
                  const isCholesterol = key.toLowerCase().includes('cholesterol');
                  const max = isGlucose ? 150 : isCholesterol ? 300 : 100;
                  const color = value > (max * 0.8) ? 'var(--warning-color)' : 'var(--primary-color)';
                  
                  return (
                    <div key={key} style={{ padding: '0.75rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)' }}>
                      <div className="muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '800' }}>{key}</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: '700', color: color }}>{value}</div>
                      <VitalChart value={value} max={max} color={color} />
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
