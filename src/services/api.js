import { doctors } from './doctorsData'

function delay(ms = 500) {
  return new Promise((res) => setTimeout(res, ms))
}

// Small mock datasets (kept locally in this file for the fake API)
const appointments = [
  { id: 'a1', doctorId: 'd1', doctorName: 'Dr. Alice Smith', date: '2026-02-10T09:00', patient: 'Test User', status: 'upcoming' },
  { id: 'a2', doctorId: 'd2', doctorName: 'Dr. Bob Jones', date: '2025-12-01T09:00', patient: 'Test User', status: 'past' }
]

const records = [
  { id: 'r1', date: '2025-11-01', type: 'Lab Result', title: 'Blood Panel', values: { glucose: 95, cholesterol: 180 } },
  { id: 'r2', date: '2026-01-15', type: 'Vitals', title: 'Annual Check', values: { bp: '120/80', weight: 72 } }
]

export async function fetchDoctors({ specialty, location } = {}) {
  await delay(400)
  let results = doctors
  if (specialty) results = results.filter((d) => d.specialty.toLowerCase().includes(specialty.toLowerCase()))
  if (location) results = results.filter((d) => d.location.toLowerCase().includes(location.toLowerCase()))
  return results
}

export async function fetchAppointments(userId) {
  await delay(300)
  return appointments
}

export async function fetchRecords(userId) {
  await delay(300)
  return records
}

export async function postBooking(payload) {
  await delay(400)
  // In a real API you'd persist and return the new appointment
  return { success: true, confirmationId: 'C-' + Math.random().toString(36).slice(2, 9), booking: payload }
}
