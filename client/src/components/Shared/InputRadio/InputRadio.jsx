import React, { useEffect } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const InputRadio = ({
  label,
  options,
  required=false,
  name,
  onChange
}) => {
  const [value, setValue] = React.useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(
    () => {
      onChange(value);
    }
  , [value, onChange])

  return (
    <FormControl required={required}>
      <FormLabel id="demo-controlled-radio-buttons-group">{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name={name}
        value={value}
        onChange={handleChange}
      >
        {options.map((option, index) => {
          return (
            <FormControlLabel key={index} value={option} control={<Radio required={required}/>} label={option} />
          )
        })}
      </RadioGroup>
    </FormControl>
  );
}

export default InputRadio