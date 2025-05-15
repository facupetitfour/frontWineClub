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

const BACK_URL = import.meta.env.VITE_BACK_URL;

const Register = () => {
  const [messageError, setMessageError] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(BACK_URL + "authenticate/register", data);
      // console.log("RESPONSE DATA: ", response);
      navigate("/verify-email");
    } catch (error) {
      if (error.response.status === 403) {
        navigate("/verify-email",{  
          state: {
            userId: error.response.data.userId,
            email: error.response.data.email,
          },
        });
      }
      // console.error("RESPONSE ERROR: ", error.response?.data?.message);
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
          marginTop={"10%"}
        >
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <img style={{height:250}} src="/logotipo.png" />
          </Grid>
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
                  label="Usuario"
                  {...register("username", {
                    required: "El username es requerido",
                    maxLength: {
                      value: 15,
                      message: "Máximo 15 caracteres",
                    },
                    minLength: {
                      value: 6,
                      message: "Mínimo 6 caracteres",
                    },
                    pattern: {
                      value: /^[^\s]+$/,
                      message: "No se permiten espacios",
                    },
                    onBlur: (e) => {
                      const trimmed = e.target.value.trim();
                      setValue("username", trimmed, { shouldValidate: true });
                    }
                  })}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  {...register("email", {
                    required: "El email es requerido",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                      message: "Debe ser un email válido",
                    },
                    onBlur: (e) => {
                      const trimmed = e.target.value.trim();
                      setValue("email", trimmed, { shouldValidate: true });
                    }
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  fullWidth
                  label="Password"
                  {...register("password", {
                    required: "El password es requerido",
                    minLength: {
                      value: 8,
                      message: "Mínimo 8 caracteres",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Debe incluir mayúscula, número y carácter especial",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
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

export default Register;
