import { useForm } from "react-hook-form";
import {
  Button,
  CardActions,
  Box,
  Alert,
  Grid,
  TextField,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const BACK_URL = import.meta.env.VITE_BACK_URL;

const InicioSesion = () => {
  const [messageError, setMssageError] = useState();
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        BACK_URL + "authenticate/logIn",
        data,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("access_token", response.data.userdata.access_token);
      navigate("/home");
    } catch (error) {
      // console.log("RESPONSE ERRR: ", error);
      if (error.response.status === 403) {
        navigate("/verify-email", {
          state: {
            userId: error.response.data.userId,
            email: error.response.data.email,
          },
        })
      }
      // console.log("RESPONSE ERRR: ", error.response.data.message);
      setMssageError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/home");
    }else{
      setRender(true);
    }
  }, [])

  return (
    <>
      {messageError && (
        <Box sx={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
          <Alert
            variant="filled"
            severity="error"
            onClose={() => setMssageError(null)}
            sx={{ position: "absolute", zIndex: 10, maxWidth: "90%", width: "auto" }}
          >
            {messageError}
          </Alert>
        </Box>
      )}
      {render ? (
        <Grid container sx={{ minHeight: "100vh" }}>
          <Grid item xs={12} bgcolor={"white"} zIndex={2} marginTop={"10%"}>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
              <img style={{ height: 250 }} src="/logotipo.png" />
            </Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container justifyContent={"center"} width={"100%"} padding={5} rowSpacing={4}>
                <Grid item xs={12}>
                  <h1>Inicio de Sesión</h1>
                  <TextField
                    fullWidth
                    label="Username"
                    {...register("username", { required: true })}
                    error={!!errors.username}
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
                    <Button size="medium" onClick={() => navigate("/register")} disabled={loading}>
                      Registrarse
                    </Button>
                    <Button
                      type="submit"
                      size="medium"
                      variant="contained"
                      disabled={loading}
                      sx={{ minWidth: 100, height: 36, position: "relative" }}
                    >
                      {loading ? (
                        <CircularProgress size={24} sx={{ color: "white" }} />
                      ) : (
                        "Iniciar"
                      )}
                    </Button>
                  </CardActions>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      ) : (null)}
      
    </>
  );
};

export default InicioSesion;
