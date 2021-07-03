import React from 'react'
import PropTypes from 'prop-types'
import ClayForm, { ClaySelect } from '@clayui/form'
import { useSelector } from 'react-redux'

import './index.scss'

function City({ valueProp, onChange, label }) {
  const { cities } = useSelector((state) => state.calamities.filter)
  const options = [
    { label: 'Cidade', value: null },
    ...cities.map((city) => ({ label: city, value: city })),
  ]

  return (
    <div className='city-filter'>
      <ClayForm.Group>
        <label htmlFor='city'>{label}</label>
        <ClaySelect
          id='city'
          value={valueProp}
          onChange={(value) => onChange(value)}
        >
          {options.map((item) => (
            <ClaySelect.Option
              placeholder='Selecione'
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </ClaySelect>
      </ClayForm.Group>
    </div>
  )
}

City.defaultProps = {
  onChange: () => {},
  valueProp: '',
  label: 'Cidade',
}

City.propTypes = {
  onChange: PropTypes.func,
  valueProp: PropTypes.string,
  label: PropTypes.string,
}

export default City
