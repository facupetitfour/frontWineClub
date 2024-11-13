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
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";

const ModalProductAddOrEdit = ({
  state,
  createItem,
  updateItem,
  product,
  dataUsers,
  dataCategories,
}) => {
  const [open, setOpen] = useState(state);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Para cargar valores iniciales en el formulario
  } = useForm();

  useEffect(() => {
    if (product) {
      // Cargar datos de producto en el formulario si se proporciona un producto
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("points_required", product.points_required);
      setValue("stock", product.stock);
      setValue("available", product.available);
      setValue("categoria_id", product.categoria_id);
      setValue("user_id", product.user_id);
    }
  }, [product, setValue, state]);

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

    if (product) {
      updateItem({ ...product, ...productData }); // Si existe un producto, actualizarlo
    } else {
      createItem(productData); // Si no existe, crearlo
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
            <h1>{product ? "Editar Producto" : "Agregar Producto"}</h1>
            <Grid container sx={{ width: "100%", padding: 2 }} rowSpacing={3}>
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
                  helperText={errors.description && "La descripción es requerida"}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  label="Puntos requeridos"
                  type="number"
                  {...register("points_required", { required: true })}
                  error={!!errors.points_required}
                  helperText={errors.points_required && "Este campo es requerido"}
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
                    {...register("available", { required: true })}
                    defaultValue={product ? product.available : true}
                  >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Categoría</InputLabel>
                  <Select
                    labelId="category-label"
                    label="Categoría"
                    {...register("categoria_id", { required: true })}
                    defaultValue={product ? product.categoria_id : ""}
                  >
                    {dataCategories ? (
                      dataCategories.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled value="">
                        No se encontraron categorías
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={12}>
                <FormControl fullWidth>
                  <InputLabel id="user-label">Bodega</InputLabel>
                  <Select
                    labelId="user-label"
                    label="Bodega"
                    {...register("user_id", { required: true })}
                    defaultValue={product ? product.user_id : ""}
                  >
                    {dataUsers ? (
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
              </Grid>
            </Grid>

            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button type="submit" variant="contained" color="primary">
                {product ? "Editar Producto" : "Crear Producto"}
              </Button>
            </CardActions>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ModalProductAddOrEdit;
