import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

const InputYearPicker = React.forwardRef(({
  label,
  maxDate,
  required=false
}, ref ) => {
  const [year, setYear] = React.useState(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
          views={['year']}
          label={label}
          maxDate={maxDate}
          value={year}
          onChange={(newValue) => {
            setYear(newValue);
          }}
          inputRef={ref}
          renderInput={(params) => <TextField {...params} required={required}/>}
        />
    </LocalizationProvider>
  );
});

InputYearPicker.displayName = "InputYearPicker";

export default InputYearPicker;
