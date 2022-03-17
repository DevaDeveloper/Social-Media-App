import React, { FC, useState } from 'react';
import {
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

import Navbar from '../home/Navbar';
import AddPostPng from '../../assets/newPost.png';
import styles from './PostScreen.module.scss';

const PostScreen: FC = () => {
  const [accessibility] = useState<string>();
  const [type] = useState<string>();

  return (
    <div>
      <Navbar />
      <div className={styles.addPostHolder}>
        <div>
          <img src={AddPostPng} alt="Add New" />
        </div>
        <div className={styles.addPostInputHolder}>
          <Typography variant="h2" sx={{ fontWeight: '400' }}>
            Add New Post
          </Typography>
          <form>
            <div>
              <TextField
                id="name"
                variant="standard"
                label="Name"
                color="primary"
                type="text"
                required
                sx={{
                  borderBottom: '1px solid #fff',
                  width: '100%',
                  lineHeight: '24px',
                  margin: '10px auto',
                }}
              />
              <TextField
                id="standard-basic"
                label="Standard"
                variant="standard"
                sx={{
                  borderBottom: '1px solid #fff',
                  width: '100%',
                  lineHeight: '24px',
                  margin: '10px 0',
                }}
              />

              <TextField
                id="place"
                variant="standard"
                label="Place"
                color="primary"
                type="text"
                required
                sx={{
                  borderBottom: '1px solid #fff',
                  width: '100%',
                  lineHeight: '24px',
                  margin: '10px 0',
                }}
              />

              <FormControl variant="standard" fullWidth>
                <InputLabel id="accesibility-label">Accessibility</InputLabel>
                <Select
                  labelId="accesibility-label"
                  id="accesibility"
                  value={accessibility}
                  label="Accessibility"
                  sx={{ width: '100%', color: '#000', margin: '10px 0' }}
                >
                  <MenuItem value="Car">By passenger car</MenuItem>
                  <MenuItem value="Offroad">Off-road vehicle</MenuItem>
                  <MenuItem value="NotByVehicle">
                    It is not possible to come by vehicle
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="standard" fullWidth>
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                  labelId="type-label"
                  id="type"
                  value={type}
                  label="Type"
                  sx={{ width: '100%', color: '#000', margin: '10px 0' }}
                >
                  <MenuItem value="Excursion">Excursion site</MenuItem>
                  <MenuItem value="Waterfall">Waterfall</MenuItem>
                  <MenuItem value="Mountain">Mountain Trail</MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="description"
                variant="standard"
                label="Add Description"
                color="primary"
                type="text"
                required
                sx={{
                  borderBottom: '1px solid #fff',
                  lineHeight: '24px',
                  width: '100%',
                  margin: '10px 0',
                }}
              />

              {/* <button type="submit">Publish</button>
               */}
              {/*
              <button type="submit">Discard</button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostScreen;
