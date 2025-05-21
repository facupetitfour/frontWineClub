"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { styled } from "@mui/material/styles"
import {
  Button,
  CardActions,
  Box,
  Alert,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Stack,
  CardMedia,
  IconButton,
  Paper,
  Container,
  Divider,
  Card,
} from "@mui/material"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import DeleteIcon from "@mui/icons-material/Delete"

const BACK_URL = import.meta.env.VITE_BACK_URL

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

// Enhanced styling for the image preview container
const ImagePreviewBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: 120,
  height: 120,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: theme.shadows[3],
  },
}))

// Enhanced styling for the delete button
const DeleteButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 4,
  right: 4,
  backgroundColor: theme.palette.background.paper,
  padding: 4,
  "&:hover": {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  zIndex: 2,
}))

// Enhanced styling for the form container
const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,
}))

// Enhanced styling for section titles
const SectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  fontWeight: 600,
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: -8,
    left: 0,
    width: 40,
    height: 3,
    backgroundColor: theme.palette.primary.main,
  },
}))

const EditProfileBodega = () => {
  const [messageError, setMessageError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState([])
  const [previewImages, setPreviewImages] = useState([])
  const [imagesEliminatedPublicId, setImagesEliminatedPublicId] = useState([])
  const token = localStorage.getItem("access_token")

  let userId
  try {
    const decoded = token ? jwtDecode(token) : {}
    userId = decoded.sub
  } catch (err) {
    // console.error("Invalid token", err);
  }

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      city: "",
      postal_code: "",
      country: "",
      neighborhood: "",
      province: "",
      description: "",
    },
  })

  useEffect(() => {
    if (!userId) {
      navigate("/login")
      return
    }

    const getBodegaUserData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${BACK_URL}users/${userId}/userProfileBodega`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const profile = response.data.profile || {}
        // seteado los valores del formulario
        console.log("Perfil de Bodega", profile)
        reset({
          name: profile.name || "",
          surname: profile.surname || "",
          city: profile.address.city || "",
          postal_code: profile.address.postal_code || "",
          img: profile.img || [],
          country: profile.address.country || "",
          neighborhood: profile.address.neighborhood || "",
          province: profile.address.province || "",
          description: profile.address.description || "",
        })

        // Si el Perfil tiene imágenes, cargarlas
        if (profile.img && profile.img.length > 0) {
          setPreviewImages(
            profile.img.map((img) => ({
              url: img.url || img,
              isExisting: true,
              id: img._id || img.id || Math.random().toString(36).substring(7),
              public_id: img.public_id,
            })),
          )
        }
      } catch (error) {
        console.error("Error al cargar el perfil", error)
        setMessageError(error.response?.data?.message || "No se pudo cargar el perfil")
      } finally {
        setLoading(false)
      }
    }

    getBodegaUserData()
  }, [userId, token, reset])

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
    const imgdeletdIdpublic_id = previewImages.find((img) => img.id === id).public_id
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

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        surname: data.surname,
        address: {
          city: data.city,
          postal_code: data.postal_code,
          country: data.country,
          neighborhood: data.neighborhood,
          province: data.province,
          description: data.description,
        },
      }

      // Crear un FormData para enviar archivos
      const formData = new FormData()
      // Añadir los datos del Perfil
      Object.keys(payload).forEach((key) => {
        if (key === "address") {
          formData.append("address", JSON.stringify(payload.address))
        } else {
          formData.append(key, payload[key])
        }
      })

      images.forEach((image) => {
        formData.append("img", image)
      })
      const existingImages = previewImages.filter((img) => img.isExisting).map((img) => {return {url: img.url, public_id: img.public_id}})

      formData.append("existingImages", JSON.stringify(existingImages))
      formData.append("eliminateImages", JSON.stringify(imagesEliminatedPublicId))

      for (const [clave, valor] of formData.entries()) {
        console.log("Clave:", clave, "Valor:", valor)
      }
      // Use PUT for updating existing resource
      await axios.put(
        `${BACK_URL}users/${userId}/profileBodega`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      const msg = error.response?.data?.message || "Error inesperado"
      setMessageError(msg)
      // Map validation errors if provided
      if (error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(([field, msgs]) => {
          setError(field, { type: "server", message: msgs.join(", ") })
        })
      }
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress size={60} thickness={4} />
      </Box>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card elevation={3}>
        <Box p={4}>
          <Typography variant="h4" align="center" gutterBottom fontWeight="bold" color="primary">
            Editar Perfil
          </Typography>

          {messageError && (
            <Alert
              variant="filled"
              severity="error"
              onClose={() => setMessageError(null)}
              sx={{ mb: 3, borderRadius: 1 }}
            >
              {messageError}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <SectionTitle variant="h6">Información Personal</SectionTitle>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre"
                  variant="outlined"
                  {...register("name", { required: "El nombre es requerido" })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Apellido"
                  variant="outlined"
                  {...register("surname", { required: "El apellido es requerido" })}
                  error={!!errors.surname}
                  helperText={errors.surname?.message}
                />
              </Grid>
            </Grid>

            <SectionTitle variant="h6" sx={{ mt: 4 }}>
              Dirección
            </SectionTitle>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="País"
                  variant="outlined"
                  {...register("country", { required: "El país es requerido" })}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Provincia"
                  variant="outlined"
                  {...register("province", { required: "La provincia es requerida" })}
                  error={!!errors.province}
                  helperText={errors.province?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Ciudad" variant="outlined" {...register("city")} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Barrio" variant="outlined" {...register("neighborhood")} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Código Postal"
                  variant="outlined"
                  {...register("postal_code", { required: "El código postal es requerido" })}
                  error={!!errors.postal_code}
                  helperText={errors.postal_code?.message}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ mt: 3 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Descripción"
                variant="outlined"
                {...register("description")}
              />
            </Grid>

            <SectionTitle variant="h6" sx={{ mt: 4 }}>
              Imágenes del Perfil
            </SectionTitle>
            <Divider sx={{ mb: 3 }} />

            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{
                mb: 3,
                px: 3,
                py: 1.2,
                borderRadius: 2,
                boxShadow: 2,
                transition: "all 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 3,
                },
              }}
            >
              Subir imágenes
              <VisuallyHiddenInput type="file" multiple accept="image/*" onChange={handleImageChange} />
            </Button>

            {previewImages.length > 0 && (
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  mt: 3,
                  flexWrap: "wrap",
                  gap: 2,
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                {previewImages.map((img, index) => (
                  <ImagePreviewBox key={img.id}>
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
                    <DeleteButton size="small" onClick={() => handleRemoveImage(img.id)}>
                      <DeleteIcon fontSize="small" />
                    </DeleteButton>
                  </ImagePreviewBox>
                ))}
              </Stack>
            )}

            <CardActions
              sx={{
                justifyContent: "space-between",
                mt: 4,
                pt: 3,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Button
                onClick={() => navigate(-1)}
                variant="outlined"
                sx={{
                  px: 3,
                  borderRadius: 2,
                }}
              >
                Volver
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  px: 4,
                  borderRadius: 2,
                  boxShadow: 2,
                  "&:hover": {
                    boxShadow: 3,
                  },
                }}
              >
                {isSubmitting ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CircularProgress size={20} sx={{ mr: 1 }} color="inherit" />
                    Guardando...
                  </Box>
                ) : (
                  "Guardar"
                )}
              </Button>
            </CardActions>
          </form>
        </Box>
      </Card>
    </Container>
  )
}

export default EditProfileBodega
