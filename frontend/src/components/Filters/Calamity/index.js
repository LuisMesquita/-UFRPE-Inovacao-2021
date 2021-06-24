import React from 'react'
import PropTypes from 'prop-types'
import { ClaySelect } from '@clayui/form'
import { CALAMITY_TYPES } from '../../../utils/domains/calamityTypes'

import './index.scss'

function Calamity({ onChange, valueProp }) {
  const options = [
    { label: 'Calamidade', value: 'Calamidade' },
    ...CALAMITY_TYPES,
  ]

  return (
    <div className='calamity-filter'>
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

Calamity.defaultProps = {
  onChange: () => {},
  valueProp: '',
}

Calamity.propTypes = {
  onChange: PropTypes.func,
  valueProp: PropTypes.string,
}

export default Calamity
