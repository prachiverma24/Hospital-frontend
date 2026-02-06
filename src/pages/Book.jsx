import React, { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDoctors } from '../hooks/useDoctors'
import { postBooking } from '../services/api'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'
import Avatar from '../components/Avatar'

export default function Book() {
  const location = useLocation()
  const nav = useNavigate()
  const initialDoctor = location.state?.doctor || null
  const initialTime = location.state?.initialTime || ''
  const isReschedule = location.state?.isReschedule || false

  const [step, setStep] = useState(isReschedule ? 2 : 1)
  const [selectedDoctor, setSelectedDoctor] = useState(initialDoctor)
  const [selectedTime, setSelectedTime] = useState(initialTime)
  const [patientNote, setPatientNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmation, setConfirmation] = useState(null)
  
  const headingRef = useRef(null)
  const { data: doctors = [], isLoading } = useDoctors()

  useEffect(() => {
    headingRef.current?.focus()
  }, [step])

  async function handleSubmit(e) {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
      return
    }
    
    setIsSubmitting(true)
    try {
      const payload = { 
        doctorId: selectedDoctor?.id, 
        doctorName: selectedDoctor?.name,
        date: selectedTime,
        patientNote 
      }
      const res = await postBooking(payload)
      setConfirmation(res)
      
      // Simulate Notification
      console.log(`[SIMULATION] Email Sent to patient: Appointment confirmed with ${selectedDoctor.name}`);
      console.log(`[SIMULATION] SMS Sent: Your visit is scheduled for ${new Date(selectedTime).toLocaleString()}`);
    } finally {
      setIsSubmitting(false)
    }
  }

  if (confirmation) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: '4rem 1rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h1>Booking Confirmed!</h1>
        <p className="muted" style={{ marginBottom: '2rem' }}>
          Your appointment with <strong>{selectedDoctor.name}</strong> is scheduled for{' '}
          <strong>{new Date(selectedTime).toLocaleString()}</strong>.
        </p>
        <Card>
          <div className="muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Confirmation ID</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{confirmation.confirmationId}</div>
        </Card>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button onClick={() => nav('/dashboard')}>Go to Dashboard</Button>
          <Button variant="secondary" onClick={() => nav('/appointments')}>View Appointments</Button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1>Book an Appointment</h1>
        <p className="muted">Complete the steps below to schedule your visit.</p>
      </header>

      {/* Progress Stepper */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem', position: 'relative' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 1 }}>
            <div style={{ 
              width: 32, 
              height: 32, 
              borderRadius: '50%', 
              backgroundColor: step >= i ? 'var(--primary-color)' : 'var(--bg-secondary)',
              color: step >= i ? 'white' : 'var(--text-muted)',
              border: `2px solid ${step >= i ? 'var(--primary-color)' : 'var(--border-color)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              transition: 'all 0.3s'
            }}>
              {i}
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: step >= i ? 'var(--text-primary)' : 'var(--text-muted)' }}>
              {i === 1 ? 'Provider' : i === 2 ? 'Schedule' : 'Details'}
            </span>
          </div>
        ))}
      </div>

      <Card>
        <h2 ref={headingRef} tabIndex="-1" style={{ outline: 'none', fontSize: '1.25rem', marginBottom: '1.5rem' }}>
          {step === 1 && "Choose your Healthcare Provider"}
          {step === 2 && "Pick a Date and Time"}
          {step === 3 && "Additional Details"}
        </h2>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="form-row">
              {isLoading ? (
                <div className="muted">Loading providers...</div>
              ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {doctors.map(d => (
                    <div 
                      key={d.id} 
                      onClick={() => setSelectedDoctor(d)}
                      style={{ 
                        padding: '1rem', 
                        border: `2px solid ${selectedDoctor?.id === d.id ? 'var(--primary-color)' : 'var(--border-color)'}`,
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: selectedDoctor?.id === d.id ? 'rgba(37, 99, 235, 0.05)' : 'transparent'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Avatar src={d.imageUrl} alt={d.name} size={48} shape="circle" />
                        <div>
                          <div style={{ fontWeight: '600' }}>{d.name}</div>
                          <div className="muted" style={{ fontSize: '0.875rem' }}>{d.specialty} • {d.location}</div>
                        </div>
                      </div>
                      <div style={{ 
                        width: 20, 
                        height: 20, 
                        borderRadius: '50%', 
                        border: '2px solid var(--primary-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {selectedDoctor?.id === d.id && <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--primary-color)' }} />}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="form-row">
              <label>Select an Available Slot</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
                {selectedDoctor?.availability.map(t => (
                  <button 
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    style={{ 
                      padding: '0.75rem', 
                      borderRadius: 'var(--radius-md)', 
                      border: `1px solid ${selectedTime === t ? 'var(--primary-color)' : 'var(--border-color)'}`,
                      backgroundColor: selectedTime === t ? 'var(--primary-color)' : 'transparent',
                      color: selectedTime === t ? 'white' : 'inherit',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    {new Date(t).toLocaleDateString()}<br/>
                    {new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-row">
              <label htmlFor="notes">Notes for the Doctor (Optional)</label>
              <textarea 
                id="notes" 
                value={patientNote} 
                onChange={(e) => setPatientNote(e.target.value)}
                rows="4"
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                placeholder="Briefly describe the reason for your visit..."
              />
            </div>
          )}

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            {step > 1 ? (
              <Button variant="secondary" onClick={() => setStep(step - 1)}>Back</Button>
            ) : (
              <div />
            )}
            <Button type="submit" disabled={isSubmitting || (step === 1 && !selectedDoctor) || (step === 2 && !selectedTime)}>
              {isSubmitting ? 'Booking...' : step === 3 ? 'Confirm Appointment' : 'Next Step'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
