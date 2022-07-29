import React from 'react'
import TextField from '@mui/material/TextField';

const InputNumberField= ({ label, defaultValue, required=true } ) => {
  return (
    <TextField
      required={required}
      id="outlined-required"
      label={label}
      defaultValue={defaultValue}
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
    />
  )
}

export default InputNumberField