import axios from 'axios'

export const getAddress = async (cep) => {
  if (!/^\d{5}-\d{3}$/.test(cep)) {
    return null
  }
  console.log(`cep`, cep)
  const cepSplited = cep.split('-')
  const cepFormatted = cepSplited[0] + cepSplited[1]
  const { data } = await axios.get(
    `https://viacep.com.br/ws/${cepFormatted}/json/`,
  )
  return data
}
