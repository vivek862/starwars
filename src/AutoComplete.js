import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutoComplete(props) {
  return (
    <Autocomplete
      id="planet-select"
      sx={{ width: 500 }}
      options={props.planets}
      autoHighlight
      getOptionLabel={(option) => option.name}
      onInputChange={(event, value) => props.handleInputChange(value)}
      onChange={(event, value) => props.callback(value)}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          
          {option.name} 
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="select a planet"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password'
          }}
        />
      )}
    />
  );
}