import React from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { logoutUser } from '../../features/login/loginSlice';
import { useAppDispatch } from '../../store/hooks';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  fontFamily: 'Poppins',
  boxShadow: 24,
  background: '#fff',
  borderRadius: '16px',
  padding: '52px',
  zIndex: '9999',
};

const Modal = ({ handleCloseModal }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push('/login');
  };

  return (
    <div>
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{
            fontFamily: 'Poppins',
            maxWidth: '200px',
            margin: '0 auto',
            border: 'none',
          }}
        >
          Are you sure you want to log out?
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={() => handleCloseModal()}
            type="button"
            style={{
              background: '#EAEAF5',
              borderRadius: '100px',
              padding: '10px 42px',
              border: 'none',
            }}
          >
            No
          </button>
          <button
            onClick={() => handleLogout()}
            type="button"
            style={{
              background: '#00B960',
              borderRadius: '100px',
              padding: '10px 42px',
              border: 'none',
              color: '#fff',
            }}
          >
            Yes
          </button>
        </div>
      </Box>
    </div>
  );
};

export default Modal;
