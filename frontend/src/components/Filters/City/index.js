import React from 'react'
import PropTypes from 'prop-types'
import { ClaySelect } from '@clayui/form'
import { useSelector } from 'react-redux'

import './index.scss'

function City({ valueProp, onChange }) {
  const { cities } = useSelector((state) => state.calamities.filter)
  const options = [
    { label: 'Cidade', value: null },
    ...cities.map((city) => ({ label: city, value: city })),
  ]

  return (
    <div className='city-filter'>
      <ClaySelect value={valueProp} onChange={(value) => onChange(value)}>
        {options.map((item) => (
          <ClaySelect.Option
            placeholder='Selecione'
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </ClaySelect>
    </div>
  )
}

City.defaultProps = {
  onChange: () => {},
  valueProp: '',
}

City.propTypes = {
  onChange: PropTypes.func,
  valueProp: PropTypes.string,
}

export default City
