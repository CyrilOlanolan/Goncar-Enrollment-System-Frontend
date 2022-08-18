import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const InputSelect = React.forwardRef(({
  label,
  options,
  name,
  required=false,
  fullWidth=false
}, ref) => {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth required={required}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          fullWidth={fullWidth}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
          ref={ref}
          name={name}
          inputRef={ref}
        >
          {options.map((option, index) => {
            return <MenuItem key={index} value={option}>{option}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  );
});

InputSelect.displayName = "InputSelect";

export default InputSelect;
