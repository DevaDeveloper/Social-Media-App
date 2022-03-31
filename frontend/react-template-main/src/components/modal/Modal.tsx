import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  fontFamily: 'Poppins',
  boxShadow: 24,
  background: '#fff',
  borderRadius: '16px',
  padding: '52px',
  zIndex: '9999',
};

const Modal = ({ handleCloseModal, text, handleAction }) => (
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
        {text}
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
          onClick={() => handleAction()}
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

export default Modal;
