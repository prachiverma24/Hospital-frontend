// Use environment variable if available, otherwise fallback to the provided Render URL
const API_BASE = import.meta.env.VITE_API_BASE || 'https://hospital-backend-5o2k.onrender.com/api';

/**
 * Helper to handle fetch responses and errors
 */
async function request(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
}

export async function fetchDoctors({ specialty, location } = {}) {
  const params = new URLSearchParams();
  if (specialty) params.append('specialty', specialty);
  if (location) params.append('location', location);
  
  return request(`/doctors?${params.toString()}`);
}

export async function fetchAppointments(userId) {
  // The backend endpoint is /api/appointments/:userId
  return request(`/appointments/${userId}`);
}

export async function fetchRecords(userId) {
  return request(`/records/${userId}`);
}

export async function postBooking(payload) {
  return request('/appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
