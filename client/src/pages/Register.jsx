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
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const serverhost = "http://localhost:3000/";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("ONSUBMIT DATA: ", data);
    axios
      .post(serverhost + "authenticate/register", data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("RESPONSE DATA: ", response);
        navigate("/");
      })
      .catch((error) => {
        console.log("RESPONSE ERRR: ", error.response.data.message);
      });
  };
  return (
    <>
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
              <CardHeader title="Registrase" />
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
                  <Input
                    {...register("username", {
                      required: true,
                      maxLength: 20,
                      minLength: 8,
                    })}
                  />
                  {errors.username?.type === "required" && (
                    <p>El campo es requerido</p>
                  )}
                  {errors.username?.type === "maxLength" && (
                    <p>El nombre tiene que tener maximo 20 caracteres</p>
                  )}
                  {errors.username?.type === "minLength" && (
                    <p>El nombre tiene que tener minimo ocho caracteres</p>
                  )}
                </FormGroup>
                <FormGroup>
                  <FormLabel>Email</FormLabel>
                  <Input
                    {...register("email", {
                      required: true,
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                    })}
                  />
                  {errors.email?.type === "required" && (
                    <span>Este campo es requerido</span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span>Debe ser un email</span>
                  )}
                </FormGroup>
                <FormGroup>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    {...register("password", {
                      required: true,
                      minLength: 8,
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    })}
                  />
                  {errors.password?.type === "required" && (
                    <span>Este campo es requerido</span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span>Debe tener al menos 8 caracteres</span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span>
                      Debe contener al menos una letra mayúscula, un número y un carácter especial
                    </span>
                  )}
                </FormGroup>
              </CardContent>
              <CardActions
                sx={{ display: "flex", flexDirection: "row-reverse" }}
              >
                <Button type="submit" size="medium">
                  Registrarse
                </Button>
              </CardActions>
            </form>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default Register;
