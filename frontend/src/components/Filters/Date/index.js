import React from 'react'
import PropTypes from 'prop-types'
import ClayForm, { ClayInput } from '@clayui/form'

import './index.scss'

function DatePicker({ valueProp, onChange, label }) {
  return (
    <div className='date-filter'>
      <ClayForm.Group>
        <label htmlFor='dateFilter'>{label}</label>
        <ClayInput
          id='dateFilter'
          value={valueProp}
          onChange={onChange}
          type='date'
        />
      </ClayForm.Group>
    </div>
  )
}

DatePicker.defaultProps = {
  onChange: () => {},
  valueProp: '',
  label: 'Date',
}

DatePicker.propTypes = {
  onChange: PropTypes.func,
  valueProp: PropTypes.string,
  label: PropTypes.string,
}

export default DatePicker
