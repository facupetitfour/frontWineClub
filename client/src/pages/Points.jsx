import {
  Grid,
  Box,
  Alert,
  Paper,
  InputBase,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import NavBarBodegas from "../component/NavBarBodegas";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

import SearchIcon from "@mui/icons-material/Search";

const serverhost = "http://localhost:3000/";

const drawerheight = 100;

const Points = () => {
  console.log("SE RENDERIA POINTS");
  const [messageError, setMssageError] = useState("");
  const [dataUserFind, setDataUserFind] = useState();

  // Instancia de useForm para la búsqueda de usuario
  const {
    register: registerSearch,
    handleSubmit: handleSubmitSearch,
    formState: { errors: errorsSearch },
  } = useForm();

  // Instancia de useForm para la carga de puntos
  const {
    register: registerPoints,
    handleSubmit: handleSubmitPoints,
    formState: { errors: errorsPoints },
  } = useForm();

  const onSubmitSearch = async (data) => {
    console.log(data);
    await axios
      .post(serverhost + "users/search", data, {
        withCredentials: true,
      })
      .then((response) => {
        setDataUserFind(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("RESPONSE ERRR: ", error.response.data.message);
        setMssageError(error.response.data.message);
      });
  };

  const onSubmitPoints = async(data) => {
    data.username = dataUserFind.username
    console.log("onSubmitPoints", data);
    await axios
    .post(serverhost + "users/cargaPuntos", data, {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data);
      setDataUserFind(response.data.user);
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
            position: "fixed",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            zIndex: 2,
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          p: 3,
          width: { sm: `100%` },
          paddingTop: `${drawerheight}px`,
        }}
      >
        <NavBarBodegas />

        <Grid
          container
          alignSelf={"center"}
          rowSpacing={2}
          sx={{ maxWidth: 700 }}
        >
          <Grid item xs={12}>
            {/* Formulario para buscar usuario */}
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                width: "100%",
              }}
              onSubmit={handleSubmitSearch(onSubmitSearch)}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                {...registerSearch("username", { required: true })}
                error={!!errorsSearch.username}
                placeholder="Buscar Usuario por su Username"
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            {dataUserFind ? (
              <>
                <Paper
                  elevation={3}
                  style={{ padding: "20px", marginTop: "20px" }}
                >
                  <Typography variant="h5" gutterBottom>
                    Datos del Usuario
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Username:</strong> {dataUserFind.username}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Nombre:</strong> {dataUserFind.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Apellido:</strong> {dataUserFind.surname}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Email:</strong> {dataUserFind.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        <strong>Puntos:</strong> {dataUserFind.points}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Formulario para ingresar puntos */}
                <Paper
                  elevation={3}
                  style={{ padding: "20px", marginTop: "20px" }}
                >
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        Ingresar cantidad de puntos
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper
                        component="form"
                        sx={{
                          display: "flex",
                          width: "100%",
                        }}
                        onSubmit={handleSubmitPoints(onSubmitPoints)}
                      >
                        <InputBase
                          type="number"
                          sx={{ ml: 1, flex: 1 }}
                          {...registerPoints("points", { required: true })}
                          error={!!errorsPoints.points}
                          placeholder="Puntos"
                        />
                        <Button
                          type="submit"
                          variant="contained"
                        >
                          Cargar
                        </Button>
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
              </>
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Points;
