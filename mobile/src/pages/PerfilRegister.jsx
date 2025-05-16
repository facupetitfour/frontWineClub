import { useForm } from "react-hook-form";
import {
  Button,
  CardActions,
  Box,
  Alert,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const BACK_URL = import.meta.env.VITE_BACK_URL;

const PerfilRegister = () => {
  const [messageError, setMessageError] = useState();
  const token = localStorage.getItem("access_token");

  const { sub } = jwtDecode(token);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formattedData = {
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

      const response = await axios.post(BACK_URL + `users/${sub}/profile`, formattedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/home");
    } catch (error) {
      setMessageError(error.response?.data?.message || "Error inesperado");
    }
  };

  return (
    <>
      {messageError && (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Alert
            variant="filled"
            severity="error"
            onClose={() => setMessageError(null)}
            sx={{
              position: "absolute",
              zIndex: 10,
              maxWidth: "90%",
              width: "auto",
            }}
          >
            {messageError}
          </Alert>
        </Box>
      )}

      <Box p={3} maxWidth={600} mx="auto">
        <Typography variant="h4" align="center" gutterBottom>
          Registrar Perfil
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
    </>
  );
};

export default PerfilRegister;
