import { useForm } from "react-hook-form";
import {
  Button,
  CardActions,
  Box,
  Alert,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const serverhost = "http://localhost:3000/";

const PerfilRegister = () => {
  const [messageError, setMessageError] = useState();
  const token = localStorage.getItem("access_token");
  const { sub } = jwtDecode(token);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
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

        const response = await axios.post(serverhost + `users/${sub}/profile`, formattedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("RESPONSE DATA: ", response);
      navigate("/home");
    } catch (error) {
      console.error("RESPONSE ERROR: ", error.response?.data?.message);
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

      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid
          item
          xs={12}
          bgcolor={"white"}
          zIndex={2}
          // marginTop={"10%"}
        >
          {/* <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <img style={{ height: 250 }} src="/logotipo.png" />
          </Grid> */}
          <form className={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              justifyContent={"center"}
              width={"100%"}
              padding={5}
              rowSpacing={4}
            >
              <Grid item xs={12}>
                <h1>Registro</h1>

                <TextField
                  fullWidth
                  label="Nombre"
                  {...register("name", {
                    required: "El nombre es requerido",
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Apellido"
                  {...register("surname", {
                    required: "El apellido es requerido",
                  })}
                  error={!!errors.surname}
                  helperText={errors.surname?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Ciudad"
                  {...register("city", {
                    required: "La ciudad es requerida",
                  })}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Código Postal"
                  {...register("postal_code", {
                    required: "El código postal es requerido",
                  })}
                  error={!!errors.postal_code}
                  helperText={errors.postal_code?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="País"
                  {...register("country", {
                    required: "El país es requerido",
                  })}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Barrio"
                  {...register("neighborhood", {
                    required: "El barrio es requerido",
                  })}
                  error={!!errors.neighborhood}
                  helperText={errors.neighborhood?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Provincia"
                  {...register("province", {
                    required: "La provincia es requerida",
                  })}
                  error={!!errors.province}
                  helperText={errors.province?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  {...register("description", {
                    required: "La descripción es requerida",
                  })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <CardActions
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Button
                    size="medium"
                    onClick={() => navigate("/")}
                  >
                    Volver
                  </Button>
                  <Button type="submit" size="medium" variant="contained">
                    Registrarse
                  </Button>
                </CardActions>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default PerfilRegister;
