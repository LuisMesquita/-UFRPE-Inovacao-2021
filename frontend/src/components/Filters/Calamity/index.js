import React from 'react'
import PropTypes from 'prop-types'
import ClayForm, { ClaySelect } from '@clayui/form'
import { CALAMITY_TYPES } from '../../../utils/domains/calamityTypes'

import './index.scss'

function Calamity({ onChange, valueProp, label }) {
  const options = [
    { label: 'Calamidade', value: 'Calamidade' },
    ...CALAMITY_TYPES,
  ]

  return (
    <div className='calamity-filter'>
      <ClayForm.Group>
        <label htmlFor='calamity'>{label}</label>
        <ClaySelect
          id='calamity'
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

Calamity.defaultProps = {
  onChange: () => {},
  valueProp: '',
  label: 'Calamidade',
}

Calamity.propTypes = {
  onChange: PropTypes.func,
  valueProp: PropTypes.string,
  label: PropTypes.string,
}

export default Calamity
