import React from 'react'
import TextField from '@mui/material/TextField';

const InputTextField = React.forwardRef(({ 
  label, 
  defaultValue, 
  required=false, 
  fullWidth=false, 
  type, 
  onChange,
  name
}, ref ) => {
  return (
    <TextField
      inputRef={ref}
      fullWidth={fullWidth}
      required={required}
      id="outlined-required"
      label={label}
      defaultValue={defaultValue}
      type={type}
      name={name}
    />
  )
});

InputTextField.displayName = "InputTextField";

export default InputTextField