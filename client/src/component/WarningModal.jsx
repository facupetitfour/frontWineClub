import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const WarningModal = (props) => {
  const style = {
    position: 'absolute',
    color: "black",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Modal
      open={props.warning}
      onClose={props.cancelWarningModal}
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h5" textAlign="center">
          ¿Estás seguro que desea eliminar?
        </Typography>
        <Typography id="modal-description" sx={{ mt:2 }}>
          No podrás deshacer esta opción.
        </Typography>
        <Box sx={{ display: 'flex', mt: 3,justifyContent:"space-between" }}>
          <Button 
            variant="outlined" 
            color="error" 
            onClick={props.cancelWarningModal} 
            sx={{ mr: 2 }}
          >
            Volver
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={props.confirmDelete}
          >
            Confirmar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default WarningModal;
