import React from 'react';
import { Modal, Box, Button } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styleModal } from './styles';
import DetailsComponent from './components/ContactDetails';
import useModal from './hooks/useModal';

const App = () => {
  const { open, handleOpen, handleClose } = useModal();
  return (
    <Box>
      <ToastContainer />
      <Box style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        <Button variant='outlined' onClick={handleOpen}>Click me</Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={styleModal}>
          <DetailsComponent handleClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
};

export default App;
