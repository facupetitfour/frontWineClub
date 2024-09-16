import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";

const ModalAddCategoria = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    img: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFormData({
      ...formData,
      img: file || null,
    });
  };

  const handleCreateItem = () => {
    props.function(formData.nombre, formData.img);
    setShowModal(false);
  };

  const handleCancel = () => {
    setFormData({
      nombre: "",
      img: null,
    });
    setShowModal(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setShowModal(true)}
      >
        Agregar
      </Button>

      <Dialog open={showModal} onClose={handleCancel} maxWidth="sm" fullWidth>
        <DialogTitle>
          Agregar Item
          <IconButton
            aria-label="close"
            onClick={handleCancel}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              placeholder="Nombre de la subcategoría"
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 2,
              }}
            >
              {formData.img ? (
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={URL.createObjectURL(formData.img)}
                    alt="Vista previa"
                    style={{ maxHeight: "250px", maxWidth: "100%" }}
                  />
                  <IconButton
                    onClick={() =>
                      setFormData({
                        ...formData,
                        img: null,
                      })
                    }
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ) : (
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<UploadIcon />}
                >
                  Subir imagen
                  <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
              )}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancel} color="error">
            Cerrar
          </Button>
          <Button onClick={handleCreateItem} variant="contained" color="primary">
            Crear Item
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalAddCategoria;
