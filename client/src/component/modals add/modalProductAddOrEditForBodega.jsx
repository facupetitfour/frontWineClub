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
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
// import jwtDecode from "jwt-decode";
// import axios from "axios";

const serverhost = "http://localhost:3000/";

const ModalProductAddOrEdit = ({
  state,
  setState,
  setSelectedProduct,
  createItem,
  updateItem,
  product,
  dataUsers,
  dataCategories,
}) => {
  const handleOpen = () => setState(true);
  const handleClose = () => {
    setState(false)
    setSelectedProduct(null)
    reset({
      name: "",
      description: "",
      points_required: 0,
      stock: 0,
      available: true,
      categoria_id: "",
    })
  };
  const token = localStorage.getItem("access_token");
  const { sub } = jwtDecode(token)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset // Para cargar valores iniciales en el formulario
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      points_required: 0,
      stock: 0,
      available: true,
      categoria_id: "",
    },
  });

  useEffect(() => {
    if (product) {
      // Cargar datos de producto en el formulario si se proporciona un producto
      reset({
        name: product.name,
        description: product.description,
        points_required: product.points_required,
        stock: product.stock,
        available: product.available,
        categoria_id: product.categoria_id,
      })
    }
  }, [product, state]);

  const onSubmit = (data) => {
    const selectedCategory = dataCategories.find(
      (category) => category._id === data.categoria_id
    );

    const productData = {
      ...data,
      categoria_name: selectedCategory ? selectedCategory.name : "",
      user_id: sub,
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
        open={state}
        // onClose={handleClose}
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
            <h1>{product ? "Editar Producto" : "Agregar Producto"}</h1>
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
                <FormControl fullWidth>
                  <InputLabel id="available-label">Disponible</InputLabel>
                  <Controller
                    name="available"
                    control={control}
                    defaultValue={true}
                    render={({ field }) => (
                      <Select
                        labelId="available-label"
                        label="Disponible"
                        {...field}
                      >
                        <MenuItem value={true}>Sí</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item md={6} sm={12}>
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
              {/* <Grid item md={12} sm={12}>
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
              </Grid> */}
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
