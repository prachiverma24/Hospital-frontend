import { doctors as doctorsList } from '../../src/services/doctorsData';

export const doctors = doctorsList;

export const appointments = [
  { id: 'a1', doctorId: 'd1', doctorName: 'Dr. Alice Smith', date: '2026-02-10T09:00', patient: 'Test User', status: 'upcoming' },
  { id: 'a2', doctorId: 'd2', doctorName: 'Dr. Bob Jones', date: '2025-12-01T09:00', patient: 'Test User', status: 'past' }
]

export const records = [
  { id: 'r1', date: '2025-11-01', type: 'Lab Result', title: 'Blood Panel', values: { glucose: 95, cholesterol: 180 } },
  { id: 'r2', date: '2026-01-15', type: 'Vitals', title: 'Annual Check', values: { bp: '120/80', weight: 72 } }
]
