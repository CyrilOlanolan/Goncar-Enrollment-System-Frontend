import React from 'react'
import TextField from '@mui/material/TextField';

const InputTextField = React.forwardRef(({ 
  label, 
  defaultValue, 
  onChange,
  required=false, 
  fullWidth=false, 
  disabled=false,
  type,
  value,
  name
}, ref ) => {

  return (
    <TextField
      inputRef={ref}
      fullWidth={fullWidth}
      required={required}
      id="outlined-required"
      label={label}
      // defaultValue={defaultValue}
      onChange={onChange ? e => onChange(e.target.value) : undefined}
      value={value}
      type={type}
      name={name}
      disabled={disabled}
    />
  )
});

InputTextField.displayName = "InputTextField";

export default InputTextField