import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const InputDatePicker= React.forwardRef(({ label, required=false, maxDate, fullWidth=false, initialValue }, ref) => {
  const [value, setValue] = useState(null);

  useEffect (
    () => {
      setValue(initialValue)
    }
  , [initialValue])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        inputRef={ref}
        maxDate={maxDate}
        label={label}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} required={required} fullWidth={fullWidth} />}
      />
    </LocalizationProvider>
  );
});

InputDatePicker.displayName = "InputDatePicker";

export default InputDatePicker;
