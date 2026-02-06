import { useQuery } from '@tanstack/react-query'
import { fetchAppointments } from '../services/api'
import { useAuth } from './useAuth'

export function useAppointments() {
  const { user } = useAuth()
  return useQuery({
    queryKey: ['appointments', user?.id],
    queryFn: () => fetchAppointments(user?.id),
    enabled: !!user,
  })
}
