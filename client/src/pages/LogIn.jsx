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

const serverhost = "http://localhost:3000/";

const InicioSesion = () => {
  const [messageError, setMssageError] = useState();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    await axios
      .post(serverhost + "authenticate/logIn", data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("RESPONSE DATA: ", response);
        navigate("/");
      })
      .catch((error) => {
        console.log("RESPONSE ERRR: ", error.response.data.message);
        setMssageError(error.response.data.message);
      });
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
            onClose={() => {
              setMssageError(null);
            }}
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
        <Grid md={8} sx={{ display: { xs: "none", sm:"none",md:"block"} }}>
          <Box
            component="img"
            src="./public/img/imglogin.png"
            alt="Imagen login"
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
              <h1> Inicio de Sesion</h1>
              <Grid item md={12} xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Username"
                  {...register("username", { required: true })}
                  error={!!errors.name}
                  helperText={errors.username && "El username es requerido"}
                />
              </Grid>
              <Grid item md={12} xs={12} sm={12}>
                <TextField
                  type="password"
                  fullWidth
                  label="Password"
                  {...register("password", { required: true })}
                  error={!!errors.password}
                  helperText={errors.password && "El password es requerido"}
                />
              </Grid>
              <Grid item md={12} xs={12} sm={12}>
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
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Registrarse
                  </Button>
                  <Button type="submit" size="medium" variant="contained">
                    Iniciar
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

export default InicioSesion;
