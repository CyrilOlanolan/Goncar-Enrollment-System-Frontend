import React from 'react'
import TextField from '@mui/material/TextField';

const InputTextArea = React.forwardRef(({ 
  label,
  rows,
  required=true,
  defaultValue
}, ref) => {
  return (
    <TextField
      inputRef={ref}
      required={required}
      id="outlined-multiline-static"
      label={label}
      multiline
      fullWidth
      rows={rows}
      defaultValue={defaultValue}
    />
  )
});

InputTextArea.displayName = "InputTextArea";

export default InputTextArea