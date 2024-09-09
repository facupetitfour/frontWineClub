import { useForm } from "react-hook-form";
import {
  FormGroup,
  Input,
  FormLabel,
  Button,
  CardContent,
  CardActions,
  Card,
  CardHeader,
  Box,
  Alert,
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
        <Box sx={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
          <Alert
            variant="filled"
            severity="error"
            onClose={() => {
              setMssageError(null);
            }}
            sx={{
              position: "absolute",
              top: 20,
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
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          position: "relative",
        }}
      >
        <Box sx={{ maxWidth: "80%", width: "500px" }}>
          <Card
            sx={{
              bgcolor: "rgb(240, 255, 255)",
              boxShadow: "0px 0px 100px rgba(0, 40, 90, 60)",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardHeader title="Inicio de Sesión" />
              <CardContent
                sx={{
                  display: "flex",
                  flexWrap: "50px",
                  flexDirection: "column",
                  "& > *": { mb: 3 },
                }}
              >
                <FormGroup>
                  <FormLabel>Username</FormLabel>
                  <Input {...register("username", { required: true })} />
                  {errors.username && <span>Este campo es requerido</span>}
                </FormGroup>
                <FormGroup>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && <span>Este campo es requerido</span>}
                </FormGroup>
              </CardContent>
              <CardActions
                sx={{ display: "flex", flexDirection: "row", justifyContent:"space-between"}}
              >
                <Button size="medium" onClick={()=>{navigate("/register")}}>
                  Registrarse
                </Button>

                <Button type="submit" size="medium">
                  Iniciar
                </Button>
              </CardActions>
            </form>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default InicioSesion;
