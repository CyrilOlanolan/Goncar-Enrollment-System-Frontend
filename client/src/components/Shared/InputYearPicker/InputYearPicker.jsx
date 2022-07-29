import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

const InputYearPicker = ({ label, maxDate }) => {
  const [year, setYear] = React.useState(new Date());
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
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
  );
};

export default InputYearPicker;
