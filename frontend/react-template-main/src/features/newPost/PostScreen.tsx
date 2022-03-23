import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import {
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  setPostName,
  setPostPlace,
  setPostAccessibility,
  setPostType,
  setPostDescription,
  clearPostInputs,
  createNewPost,
} from './newPostSlice';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Navbar from '../home/Navbar';
import AddPostPng from '../../assets/newPost.png';
import styles from './PostScreen.module.scss';

const PostScreen: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const {
    newPostName,
    newPostPlace,
    newPostAccessibility,
    newPostType,
    newPostDescription,
  } = useAppSelector((state) => state.newPost);
  const token = useAppSelector((state) => state.login.token);

  const discardNewPost = () => {
    dispatch(clearPostInputs());
    history.push('/user-posts');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      createNewPost({
        obj: {
          title: newPostName,
          location: newPostPlace,
          accessibility: newPostAccessibility,
          type: newPostType,
          description: newPostDescription,
        },
        token,
      }),
    );
    dispatch(clearPostInputs());
  };

  return (
    <div>
      <Navbar />
      <div className={styles.addPostHolder}>
        <div className={styles.new_post}>newPost</div>
        <div>
          <Typography
            variant="h2"
            sx={{ fontWeight: '400', marginBottom: '20px' }}
          >
            Add New Post
          </Typography>
        </div>
        <div>
          <img src={AddPostPng} alt="Add New" />
        </div>
        <div className={styles.addPostInputHolder}>
          <form onSubmit={handleSubmit}>
            <div>
              {/* Name input */}
              <TextField
                id="name"
                variant="standard"
                label="Name"
                color="primary"
                type="text"
                required
                value={newPostName}
                onChange={(e) => dispatch(setPostName(e.target.value))}
                sx={{
                  borderBottom: '1px solid #fff',
                  width: '100%',
                  lineHeight: '24px',
                  margin: '20px auto',
                }}
              />

              {/* Place input */}
              <TextField
                id="place"
                variant="standard"
                label="Place"
                color="primary"
                type="text"
                required
                value={newPostPlace}
                onChange={(e) => dispatch(setPostPlace(e.target.value))}
                sx={{
                  borderBottom: '1px solid #fff',
                  width: '100%',
                  lineHeight: '24px',
                  margin: '20px 0',
                }}
              />

              {/* Accessibility input  */}
              <FormControl variant="standard" fullWidth>
                <InputLabel id="accesibility-label">Accessibility</InputLabel>
                <Select
                  labelId="accesibility-label"
                  id="accesibility"
                  value={newPostAccessibility}
                  onChange={
                    (e) =>
                      // eslint-disable-next-line implicit-arrow-linebreak
                      dispatch(setPostAccessibility(e.target.value))
                    // eslint-disable-next-line react/jsx-curly-newline
                  }
                  label="Accessibility"
                  sx={{ width: '100%', color: '#000', margin: '20px 0' }}
                >
                  <MenuItem value="PASSENGER_VEHICLE">
                    By passenger car
                  </MenuItem>
                  <MenuItem value="CARGO_VEHICLE">Off-road vehicle</MenuItem>
                  <MenuItem value="VEHICLE_INACCESSIBLE">
                    It is not possible to come by vehicle
                  </MenuItem>
                </Select>
              </FormControl>

              {/* Type Input */}
              <FormControl variant="standard" fullWidth>
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                  labelId="type-label"
                  id="type"
                  value={newPostType}
                  onChange={(e) => dispatch(setPostType(e.target.value))}
                  label="Type"
                  sx={{ width: '100%', color: '#000', margin: '20px 0' }}
                >
                  <MenuItem value="PICNIC">Excursion site</MenuItem>
                  <MenuItem value="WATERFALL">Waterfall</MenuItem>
                  <MenuItem value="MOUNTAIN_TRAIL">Mountain Trail</MenuItem>
                </Select>
              </FormControl>

              {/* Description Input */}
              <TextField
                id="description"
                variant="standard"
                label="Add Description"
                color="primary"
                type="text"
                required
                value={newPostDescription}
                onChange={(e) => dispatch(setPostDescription(e.target.value))}
                sx={{
                  borderBottom: '1px solid #fff',
                  lineHeight: '24px',
                  width: '100%',
                  margin: '20px 0',
                }}
              />

              <button className={styles.btnPublish} type="submit">
                Publish
              </button>
              <button
                className={styles.btnDiscard}
                type="button"
                onClick={discardNewPost}
              >
                Discart
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostScreen;
