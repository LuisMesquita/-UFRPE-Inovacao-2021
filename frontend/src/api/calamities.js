import axios from 'axios'
import { mountQueryString } from '../utils'

const baseUrl = 'http://142.93.13.31:8000/calamity'

export async function getCalamities() {
  const { data } = await axios.get(baseUrl)
  return data
}

export async function createCalamities(data) {
  await axios.post(baseUrl, data)
}

export async function filterCalamities(params) {
  const { data } = await axios.get(`${baseUrl}${mountQueryString(params)}`)

  return data
}
