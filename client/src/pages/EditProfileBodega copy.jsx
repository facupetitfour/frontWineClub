import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import DeleteIcon from "@mui/icons-material/Delete"

const BACK_URL = import.meta.env.VITE_BACK_URL;

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

const EditProfileBodega = () => {
  const [messageError, setMessageError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([])
  const [previewImages, setPreviewImages] = useState([])
  const [imagesEliminatedPublicId, setImagesEliminatedPublicId] = useState([])
  const token = localStorage.getItem("access_token");

  let userId;
  try {
    const decoded = token ? jwtDecode(token) : {};
    userId = decoded.sub;
  } catch (err) {
    // console.error("Invalid token", err);
  }

  const navigate = useNavigate();
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
  });

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const getBodegaUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BACK_URL}users/${userId}/userProfileBodega`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        const profile = response.data.profile || {};
        // seteado los valores del formulario
        console.log("Perfil de Bodega", profile);
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
        });

        // Si el Perfil tiene imágenes, cargarlas
        if (profile.img && profile.img.length > 0) {
          setPreviewImages(
            profile.img.map((img) => ({
              url: img.url || img,
              isExisting: true,
              id: img._id || img.id || Math.random().toString(36).substring(7),
              public_id: img.public_id
            })),
          )
        }
      } catch (error) {
        console.error("Error al cargar el perfil", error);
        setMessageError(
          error.response?.data?.message || "No se pudo cargar el perfil"
        );
      } finally {
        setLoading(false);
      }
    };

    getBodegaUserData();
  }, [userId, token, reset]);

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
      };

      // Crear un FormData para enviar archivos
      const formData = new FormData()
      // Añadir los datos del Perfil
      Object.keys(data).forEach((key) => {
        console.log(key, data[key])
        // formData.append(key, data[key])
      })

      images.forEach((image) => {
        formData.append("img", image)
      })
      // Añadir referencias a imágenes existentes que se mantienen
      const existingImages = previewImages.filter((img) => img.isExisting).map((img) => { return { url: img.url, public_id: img.public_id } })

      formData.append("existingImages", JSON.stringify(existingImages))
      formData.append("eliminateImages", JSON.stringify(imagesEliminatedPublicId))

      for (const [clave, valor] of formData.entries()) {
        console.log("Clave:", clave, "Valor:", valor);
      }

      // Use PUT for updating existing resource
      // await axios.put(
      //   `${BACK_URL}users/${userId}/profile`,
      //   payload,
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   }
      // );

    } catch (error) {
      const msg = error.response?.data?.message || "Error inesperado";
      setMessageError(msg);
      // Map validation errors if provided
      if (error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(([field, msgs]) => {
          setError(field, { type: "server", message: msgs.join(", ") });
        });
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <Typography variant="h4" align="center" gutterBottom>
        Editar Perfil
      </Typography>

      {messageError && (
        <Box mb={2} position="relative">
          <Alert
            variant="filled"
            severity="error"
            onClose={() => setMessageError(null)}
          >
            {messageError}
          </Alert>
        </Box>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              {...register("name", { required: "El nombre es requerido" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Apellido"
              {...register("surname", { required: "El apellido es requerido" })}
              error={!!errors.surname}
              helperText={errors.surname?.message}
            />
          </Grid>

          {[
            { name: "country", label: "País" },
            { name: "province", label: "Provincia" },
            { name: "postal_code", label: "Código Postal" },

          ].map((field) => (
            <Grid item xs={12} key={field.name}>
              <TextField
                fullWidth
                label={field.label}
                {...register(field.name, {
                  required: `${field.label} es requerido`,
                })}
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message}
              />
            </Grid>
          ))}

          {[
            { name: "city", label: "Ciudad" },
            { name: "neighborhood", label: "Barrio" },

          ].map((field) => (
            <Grid item xs={12} key={field.name}>
              <TextField
                fullWidth
                label={field.label}
                {...register(field.name)}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Descripción"
              {...register("description")}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Imágenes del Perfil
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

          <Grid item xs={12}>
            <CardActions sx={{ justifyContent: "space-between" }}>
              <Button onClick={() => navigate(-1)}>Volver</Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Guardando..." : "Guardar"}
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditProfileBodega;