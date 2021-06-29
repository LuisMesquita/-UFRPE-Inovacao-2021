import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Calamity from './Calamity'
import City from './City'
import { filter } from '../../redux/actions/calamities.action'

import './index.scss'

function Filters() {
  const [filters, setFilters] = useState({})
  const [calamityValue, setCalamityValue] = useState()
  const [cityValue, setCityValue] = useState()
  const dispatch = useDispatch()

  const onChangeCalamity = (event) => {
    const value = event?.target?.value
    setCalamityValue(value)
    let newFilters = {}
    if (value !== 'Calamidade') {
      newFilters = {
        ...filters,
        type: value,
      }
      setFilters(newFilters)
    } else {
      delete filters.type
      newFilters = { ...filters }
    }
    dispatch(filter(newFilters))
  }

  const onChangeCity = (event) => {
    const value = event?.target?.value
    setCityValue(value)
    let newFilters = {}
    if (value !== 'Cidade') {
      newFilters = {
        ...filters,
        city: value,
      }
      setFilters(newFilters)
    } else {
      delete filters.city
      newFilters = { ...filters }
    }
    dispatch(filter(newFilters))
  }

  return (
    <div className='filters'>
      <Calamity valueProp={calamityValue} onChange={onChangeCalamity} />
      <City valueProp={cityValue} onChange={onChangeCity} />
    </div>
  )
}

export default Filters
