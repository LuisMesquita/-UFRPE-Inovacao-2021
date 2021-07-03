import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Calamity from './Calamity'
import City from './City'
import DatePicker from './Date'
import { filter } from '../../redux/actions/calamities.action'

import './index.scss'

function Filters() {
  const [filters, setFilters] = useState({})
  // const [initialDateValue, setInitialDateValue] = useState()
  // const [endDateValue, setEndDateValue] = useState()
  const dispatch = useDispatch()

  const onChangeCalamity = (event) => {
    const value = event?.target?.value
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

  const onChangeDate = (key) => (event) => {
    const value = event?.target?.value
    let newFilters = {}
    newFilters = {
      ...filters,
      [key]: value,
    }
    setFilters(newFilters)
    dispatch(filter(newFilters))
  }

  return (
    <div className='filters'>
      <Calamity valueProp={filters?.calamity} onChange={onChangeCalamity} />
      <City valueProp={filters?.city} onChange={onChangeCity} />
      <DatePicker
        label='Data inicial'
        valueProp={filters?.startDate}
        onChange={onChangeDate('startDate')}
      />
      <DatePicker
        style={{}}
        label='Data final'
        valueProp={filters?.endDate}
        onChange={onChangeDate('endDate')}
      />
    </div>
  )
}

export default Filters
