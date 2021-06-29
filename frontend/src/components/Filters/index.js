import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Calamity from './Calamity'
import { filter } from '../../redux/actions/calamities.action'

function Filters() {
  const [filters, setFilters] = useState({})
  const [calamityValue, setCalamityValue] = useState()
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
    }
    dispatch(filter(newFilters))
  }

  return (
    <div className='filters'>
      <Calamity valueProp={calamityValue} onChange={onChangeCalamity} />
    </div>
  )
}

export default Filters
