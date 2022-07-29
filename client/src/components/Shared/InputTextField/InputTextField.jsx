import React from 'react'
import TextField from '@mui/material/TextField';

const InputTextField = ({ label, defaultValue, required=true, fullWidth=false, type } ) => {
  return (
    <TextField
      fullWidth={fullWidth}
      required={required}
      id="outlined-required"
      label={label}
      defaultValue={defaultValue}
      type={type}
    />
  )
}

export default InputTextField