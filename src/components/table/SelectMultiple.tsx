import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props = {
  text: string;
  values: string[]
}

function SelectMultiple({ values, text }: Props) {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
    const { target: { value } } = event;
    
    setSelectedValues(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl 
        sx={{ 
          width: 150,
          maxHeight: 50,
          "& label.Mui-focused": {
            color: '#0B7077'
          },
        }}
      >
        <InputLabel 
          id="demo-multiple-chip-label" 
          sx={{
            color: '#0B7077',
          }}
        >
          {text}
        </InputLabel>
        <Select
          multiple
          displayEmpty
          value={selectedValues}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            return selected.join(', ');
          }}
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{
            borderRadius: 0,
            width: 120,
            "& MuiList-root": {
              color: '#0B7077'
            },
            '.MuiOutlinedInput-notchedOutline': {
              border: 0,
              borderBottom: 2,
              borderColor: '#b8d9dd',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: 0,
              borderBottom: 2,
              borderColor: '#0B7077',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: 0,
              borderBottom: 2,
              borderColor: '#0B7077',
            },
            '.MuiSvgIcon-root ': {
              fill: "#0B7077",
            },
            ".MuiMenuItem-root .MuiMenuItem-gutters": {
              backgroundColor: "#e21919",
            },
          }}
        >
          {values.map((value) => (
            <MenuItem
              key={value}
              value={value}
              sx={{
                width: 110
              }}
            >
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectMultiple;
