"use client"

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
} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { Grid } from "@mui/material"
import { useState, useEffect } from "react"
import AddIcon from "@mui/icons-material/Add"
import { jwtDecode } from "jwt-decode"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import DeleteIcon from "@mui/icons-material/Delete"
import { styled } from "@mui/material/styles"
import { CardMedia, IconButton, Stack, Typography } from "@mui/material"
// import jwtDecode from "jwt-decode";
// import axios from "axios";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})

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
  const handleOpen = () => setState(true)
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
  }
  const token = localStorage.getItem("access_token")
  const { sub } = jwtDecode(token)

  const [images, setImages] = useState([])
  const [previewImages, setPreviewImages] = useState([])
  const [imagesEliminatedPublicId,setImagesEliminatedPublicId] = useState([])
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset, // Para cargar valores iniciales en el formulario
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      points_required: 0,
      stock: 0,
      available: true,
      categoria_id: "",
      img: []
    },
  })

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

      // Si el producto tiene imágenes, cargarlas
      if (product.img && product.img.length > 0) {
        setPreviewImages(
          product.img.map((img) => ({
            url: img.url || img,
            isExisting: true,
            id: img._id || img.id || Math.random().toString(36).substring(7),
            public_id: img.public_id
          })),
        )
      }
    }
  }, [product, state])

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files)

    // Crear URLs de vista previa para los archivos seleccionados
    const newPreviewImages = selectedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      isExisting: false,
      id: Math.random().toString(36).substring(7),
    }))

    setImages([...images, ...selectedFiles])
    setPreviewImages([...previewImages, ...newPreviewImages])
  }

  const handleRemoveImage = (id) => {
    // Filtrar la imagen eliminada de las vistas previas
    let imgdeletdIdpublic_id = previewImages.find((img) => img.id === id).public_id
    setImagesEliminatedPublicId((prev) => [...prev, imgdeletdIdpublic_id])

    const updatedPreviews = previewImages.filter((img) => img.id !== id)

    setPreviewImages(updatedPreviews)

    // Si no es una imagen existente, también eliminarla del array de archivos
    const imageToRemove = previewImages.find((img) => img.id === id)
    if (!imageToRemove.isExisting) {
      const imageIndex = previewImages.findIndex((img) => img.id === id)
      const newImages = [...images]
      newImages.splice(imageIndex, 1)
      setImages(newImages)
    }
  }

  const onSubmit = (data) => {
    const selectedCategory = dataCategories.find((category) => category._id === data.categoria_id)
    // Crear un FormData para enviar archivos
    const formData = new FormData()

    // Añadir los datos del producto
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })

    // Añadir la categoría y el usuario
    // formData.append("categoria_name", selectedCategory ? dataCategories.find((category) => category._id === data.categoria_id)
    formData.append("categoria_name", selectedCategory.name)
    formData.append("user_id", sub)

    // Añadir las imágenes nuevas
    images.forEach((image) => {
      formData.append("img", image)
    })

    // Añadir referencias a imágenes existentes que se mantienen
    const existingImages = previewImages.filter((img) => img.isExisting).map((img) => {return {url: img.url, public_id: img.public_id}})

    formData.append("existingImages", JSON.stringify(existingImages))
    formData.append("eliminateImages", JSON.stringify(imagesEliminatedPublicId))
    
    if (product) {
      updateItem(formData) // Si existe un producto, actualizarlo
      // console.log("Actualizar un producto", formData)

    } else {
      // console.log("Crear nuevo producto", formData)
      createItem(formData) // Si no existe, crearlo
    }

    // Limpiar el estado de imágenes
    setImages([])
    setPreviewImages([])
    handleClose()
  }

  return (
    <>
      <Fab color="primary" aria-label="add" sx={{ position: "fixed", bottom: 16, right: 16 }} onClick={handleOpen}>
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
                  helperText={errors.description && "La descripción es requerida"}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <TextField
                  fullWidth
                  label="Puntos requeridos"
                  type="number"
                  {...register("points_required", { required: true })}
                  error={!!errors.points_required}
                  helperText={errors.points_required && "Este campo es requerido"}
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
                      <Select labelId="available-label" label="Disponible" {...field}>
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
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Imágenes del producto
                </Typography>
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ mb: 2 }}>
                  Subir imágenes
                  <VisuallyHiddenInput type="file" multiple accept="image/*" onChange={handleImageChange} />
                </Button>

                {previewImages.length > 0 && (
                  <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: "wrap", gap: 2 }}>
                    {previewImages.map((img, index) => (
                      <Box
                        key={img.id}
                        sx={{
                          position: "relative",
                          width: 100,
                          height: 100,
                          border: "1px solid #ddd",
                          borderRadius: 1,
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={img.url}
                          alt={`Preview ${index}`}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <IconButton
                          size="small"
                          sx={{
                            position: "absolute",
                            top: -10,
                            right: -10,
                            bgcolor: "background.paper",
                            "&:hover": { bgcolor: "error.light", color: "white" },
                          }}
                          onClick={() => handleRemoveImage(img.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Stack>
                )}
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
  )
}

export default ModalProductAddOrEdit
