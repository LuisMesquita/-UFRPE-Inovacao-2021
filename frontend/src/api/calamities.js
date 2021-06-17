import { useQuery } from 'react-query'

export function useCalamities() {
  return useQuery('calamities', async () => {
    const { data } = await fetch('http://localhost:8000/calamity')
    return data
  })
}
