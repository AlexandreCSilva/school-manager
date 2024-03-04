import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {
    names: string[]
}

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function SelectMultiple({ names }: Props) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl 
        sx={{ 
          width: 150,
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
          Nome
        </InputLabel>
        <Select
          multiple
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{
            borderRadius: 0,
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
            }
          }}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
              sx={{
                maxWidth: 150
              }}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectMultiple;
