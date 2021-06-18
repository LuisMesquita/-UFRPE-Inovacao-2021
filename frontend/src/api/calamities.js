import axios from 'axios'
import { useQuery } from 'react-query'

export function getCalamities() {
  return useQuery('calamities', async () => {
    const { data } = await axios.get('http://localhost:8000/calamity')
    return data
  })
}

export function createCalamities(data) {
  axios.post(`http://localhost:8000/calamity`, data)
}
