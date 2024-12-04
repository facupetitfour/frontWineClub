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
    await axios
      .post(serverhost + "authenticate/logIn", data)
      .then((response) => {
        localStorage.setItem(
          "access_token",
          response.data.userdata.access_token
        );
        navigate("/home");
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

      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid
          item
          xs={12}
          bgcolor={"white"}
          // boxShadow={"0 2px 50px rgba(0, 0, 0, 1)"}
          zIndex={2}
          marginTop={"10%"}
        >
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center"}}>
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
                <h1> Inicio de Sesion</h1>

                <TextField
                  fullWidth
                  label="Username"
                  {...register("username", { required: true })}
                  error={!!errors.name}
                  helperText={errors.username && "El username es requerido"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  fullWidth
                  label="Password"
                  {...register("password", { required: true })}
                  error={!!errors.password}
                  helperText={errors.password && "El password es requerido"}
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
