/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Modal,
  Box,
  TextField,
  Button,
  Fab,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  CardActions,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

const ModalProductAdd = ({ state, createItem }) => {
  const [open, setOpen] = useState(state);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createItem(data);
    handleClose();
  };
  return (
    <>
      {/* Botón flotante */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            color: "black",
            boxShadow: 24,
            p: 2,
            maxWidth: "500px",
            width: "100%",
            borderRadius: 3,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Agregar Producto</h1>
            <Grid
              container
              sx={{ width: "100%", height: "100%", padding: 2 }}
              rowSpacing={3}
              columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            >
              <Grid item md={6}>
                <TextField
                  fullWidth
                  label="Nombre"
                  {...register("name", { required: true })}
                  error={!!errors.name}
                  helperText={errors.name && "El nombre es requerido"}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  label="Descripción"
                  {...register("description", { required: true })}
                  error={!!errors.description}
                  helperText={
                    errors.description && "La descripción es requerida"
                  }
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  fullWidth
                  label="Imagen URL"
                  {...register("img", { required: true })}
                  error={!!errors.img}
                  helperText={errors.img && "La imagen es requerida"}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  label="Puntos requeridos"
                  type="number"
                  {...register("points_required", { required: true })}
                  error={!!errors.points_required}
                  helperText={
                    errors.points_required && "Este campo es requerido"
                  }
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  label="Stock"
                  type="number"
                  {...register("stock", { required: true })}
                  error={!!errors.stock}
                  helperText={errors.stock && "Este campo es requerido"}
                />
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <InputLabel id="available-label">Disponible</InputLabel>
                  <Select
                    labelId="available-label"
                    label="Disponible"
                    defaultValue={true}
                    {...register("available", { required: true })}
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <InputLabel id="approved-label">Aprobado</InputLabel>
                  <Select
                    labelId="approved-label"
                    label="Aprobado"
                    defaultValue={true}
                    {...register("approved", { required: true })}
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={12}>
                <FormControl fullWidth>
                  <InputLabel id="bodega-label">Bodega</InputLabel>
                  <Select
                    labelId="bodega-label"
                    label="Bodega"
                    {...register("bodega_id", { required: true })}
                    defaultValue=""
                  >
                    <MenuItem value="66e0b51eb876bff21898ae2b">
                      Bodega 1
                    </MenuItem>
                    <MenuItem value="2" disabled>
                      Bodega 2
                    </MenuItem>
                    <MenuItem value="3" disabled>
                      Bodega 3
                    </MenuItem>
                    {/* Añadir más opciones según sea necesario */}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button type="submit" variant="contained" color="primary">
                Crear Producto
              </Button>
            </CardActions>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ModalProductAdd;
