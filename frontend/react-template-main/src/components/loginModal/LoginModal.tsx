import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '400px',
  bgcolor: 'background.paper',
  border: 'none',
  fontFamily: 'Poppins',
  boxShadow: 24,
  background: '#fff',
  borderRadius: '16px',
  padding: '52px',
  zIndex: '9999',
};

const LoginModal = ({ handleCloseModal, text }) => (
  <div>
    <Box sx={style}>
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => handleCloseModal()}
          type="button"
          style={{
            position: 'absolute',
            maxWidth: '5px',
            fontSize: '18px',
            background: 'transparent',
            color: '#000',
            border: 'none',
            top: '-70px',
            left: '100%',
          }}
        >
          X
        </button>
      </div>
      <div style={{ color: '#000', textAlign: 'center' }}>
        <SentimentVeryDissatisfiedIcon sx={{ color: '#FF0000' }} />
      </div>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{
          fontFamily: 'Poppins',
          fontWeight: '600',
          fontSize: '18px',
          maxWidth: '200px',
          margin: '0 auto',
          color: '#000',
          border: 'none',
        }}
      >
        {text}
      </Typography>
    </Box>
  </div>
);

export default LoginModal;
