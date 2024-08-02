import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./App.css";

const Layercuz = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [imagePath, setImagePath] = useState('');

  // Define the mapping of select values to image paths
  const imageMapping = {
    'B1': '/uploads/B1.png',
    'B2': '/uploads/B2.png',
    '1': '/uploads/1.png',
    '2': '/uploads/2.png',
    '3': '/uploads/3.png',
    '4': '/uploads/4.png',
    '5': '/uploads/5.png',
    '6': '/uploads/6.png',
    '7': '/uploads/7.png',
    '8': '/uploads/8.png',
    '9': '/uploads/9.png',
    '10': '/uploads/10.png',
    '11': '/uploads/11.png',
    '12': '/uploads/12.png',
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedImage(selectedValue);

    // Set the image path based on the selected value
    setImagePath(imageMapping[selectedValue]);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      {/* Box for Select control */}
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel id="image-select-label">Select Layer</InputLabel>
          <Select
            labelId="image-select-label"
            id="image-select"
            value={selectedImage}
            label="Select Layer"
            onChange={handleChange}
          >
            {[ 'B2','B1', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Box for displaying the image */}
      {imagePath && (
        <Box mt={2}>
          <img
            src={`https://kasemradpcc.com/mick/my-backend/${imagePath}`}
            alt={selectedImage}
            style={{ maxWidth: '100%', maxHeight: '400px' }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Layercuz;
