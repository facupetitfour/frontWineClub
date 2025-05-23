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

const serverhost = import.meta.env.VITE_BACK_URL;

const Register = () => {
  const [messageError, setMessageError] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.roles = 'bodega'
    try {
      const response = await axios.post(`${serverhost}authenticate/register`, data);
      console.log("Registro exitoso:", response.data);
      navigate("/");
    } catch (error) {
      if (error.response.status === 403) {
        navigate("/verify-email",{  
          state: {
            userId: error.response.data.userId,
            email: error.response.data.email,
          },
        });
      }
      console.log("Error de registro:", error.response?.data?.message);
      setMessageError(error.response?.data?.message || "Error desconocido");
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
      <Grid container height={"100vh"}>
        <Grid item md={8} sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
          <Box
            component="img"
            src="/imgLogin.png"
            alt="Imagen registro"
            sx={{
              display: "block",
              filter: "brightness(0.5)",
              width: "100%",
              height: "100vh",
              objectFit: "cover",
              objectPosition: "0% 80%",
              zIndex: 1,
            }}
          />
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          bgcolor={"white"}
          alignContent={"center"}
          height={"100vh"}
          boxShadow={"0 2px 50px rgba(0, 0, 0, 1)"}
          zIndex={2}
        >
          <form className={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              justifyContent={"center"}
              width={"100%"}
              padding={5}
              rowSpacing={4}
            >
              <h1>Registrarse</h1>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  {...register("username", {
                    required: true,
                    maxLength: 15,
                    minLength: 6,
                  })}
                  error={!!errors.username}
                  helperText={
                    errors.username?.type === "required"
                      ? "El username es requerido"
                      : errors.username?.type === "maxLength"
                      ? "Máximo 15 caracteres"
                      : errors.username?.type === "minLength"
                      ? "Mínimo 6 caracteres"
                      : ""
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                  })}
                  error={!!errors.email}
                  helperText={
                    errors.email?.type === "required"
                      ? "El email es requerido"
                      : errors.email?.type === "pattern"
                      ? "Debe ser un email válido"
                      : ""
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="password"
                  fullWidth
                  label="Password"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    pattern:
                      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                  })}
                  error={!!errors.password}
                  helperText={
                    errors.password?.type === "required"
                      ? "La contraseña es requerida"
                      : errors.password?.type === "minLength"
                      ? "Mínimo 8 caracteres"
                      : errors.password?.type === "pattern"
                      ? "Debe contener una mayúscula, un número y un carácter especial"
                      : ""
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <CardActions
                  sx={{
                    display: "flex",
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
                  <Button type="submit" variant="contained">
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

export default Register;
