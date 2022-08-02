import React from 'react'
import TextField from '@mui/material/TextField';

const InputNumberField = React.forwardRef(({
  label,
  defaultValue,
  required=true,
  placeholder,
  fullWidth=false
}, ref ) => {
  return (
    <TextField
      fullWidth={fullWidth}
      required={required}
      id="outlined-required"
      label={label}
      defaultValue={defaultValue}
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
      inputRef={ref}
      placeholder={placeholder}
    />
  )
});

InputNumberField.displayName = "InputNumberField";

export default InputNumberField