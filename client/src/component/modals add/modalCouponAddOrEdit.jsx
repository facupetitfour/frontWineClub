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
import { useForm, Controller } from "react-hook-form";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";

const ModalCouponAddOrEdit = ({
  state,
  setState,
  createItem,
  updateItem,
  currentItem,
  dataUsers,
  dataCategories,
}) => {
  const [open, setOpen] = useState(state);
  const handleOpen = () => setState(true);
  const handleClose = () => setState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (currentItem) {
      setValue("name", currentItem.name);
      setValue("description", currentItem.description);
      setValue("points_required", currentItem.points_required);
      setValue("stock", currentItem.stock);
      setValue("available", currentItem.available);
      setValue("categoria_id", currentItem.categoria_id);
      setValue("user_id", currentItem.user_id);
    }
  }, [currentItem, setValue]);

  useEffect(() => {
    setOpen(state);
  }, [state]);

  const onSubmit = (data) => {
    const selectedCategory = dataCategories.find(
      (category) => category._id === data.categoria_id
    );
    const selectedUser = dataUsers.find((user) => user._id === data.user_id);

    const productData = {
      ...data,
      categoria_name: selectedCategory ? selectedCategory.name : "",
      user_id: selectedUser ? selectedUser._id : "",
    };

    if (currentItem) {
      console.log("DATA dentro del if:", data); // Para debug
      updateItem(currentItem._id, { ...currentItem, ...productData });
    } else {
      createItem(productData);
    }

    handleClose();
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>

      <Modal
        open={open}
        disableEnforceFocus
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
            <h1>{currentItem ? "Editar Cupon" : "Agregar Cupon"}</h1>
            <Grid container sx={{ width: "100%", padding: 2 }} rowSpacing={3}>
              <Grid item md={6} sm={12}>
                <TextField
                  fullWidth
                  label="Nombre"
                  {...register("name", { required: true })}
                  error={!!errors.name}
                  helperText={errors.name && "El nombre es requerido"}
                />
              </Grid>
              <Grid item md={6} sm={12}>
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
              <Grid item md={6} sm={12}>
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
              <Grid item md={6} sm={12}>
                <TextField
                  fullWidth
                  label="Stock"
                  type="number"
                  {...register("stock", { required: true })}
                  error={!!errors.stock}
                  helperText={errors.stock && "Este campo es requerido"}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Controller
                  name="available"
                  control={control}
                  defaultValue={true}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="available-label">Disponible</InputLabel>
                      <Select
                        {...field}
                        labelId="available-label"
                        label="Disponible"
                      >
                        <MenuItem value={true}>Sí</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Controller
                  name="categoria_id"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="category-label">Categoría</InputLabel>
                      <Select
                        {...field}
                        labelId="category-label"
                        label="Categoría"
                      >
                        {dataCategories && dataCategories.length > 0 ? (
                          dataCategories.map((category) => (
                            <MenuItem key={category._id} value={category._id}>
                              {category.name}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled value="">
                            No hay categorías
                          </MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item md={12} sm={12}>
                <Controller
                  name="user_id"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="user-label">Bodega</InputLabel>
                      <Select {...field} labelId="user-label" label="Bodega">
                        {dataUsers && dataUsers.length > 0 ? (
                          dataUsers.map((user) => (
                            <MenuItem key={user._id} value={user._id}>
                              {user.username}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled value="">
                            No se encontraron bodegas
                          </MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>

            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button type="submit" variant="contained" color="primary">
                {currentItem ? "Editar Cupon" : "Crear Cupon"}
              </Button>
            </CardActions>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ModalCouponAddOrEdit;
