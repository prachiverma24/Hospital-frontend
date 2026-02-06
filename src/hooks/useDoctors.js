import { useQuery } from '@tanstack/react-query'
import { fetchDoctors } from '../services/api'

export function useDoctors(filters) {
  return useQuery({
    queryKey: ['doctors', filters],
    queryFn: () => fetchDoctors(filters),
    staleTime: 1000 * 60 * 5,
  })
}
