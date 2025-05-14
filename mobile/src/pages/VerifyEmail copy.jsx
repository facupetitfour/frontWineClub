import { useForm } from "react-hook-form";
import axios from "axios";
import { Alert, Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BACK_URL = import.meta.env.VITE_BACK_URL;

const VerifyEmail = () => {
  const { register, handleSubmit } = useForm();
  const [messageError, setMessageError] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, email } = location.state || {};

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${BACK_URL}authenticate/verify-email`, {
        code: data.code,
        id: userId,
      });
      localStorage.setItem("access_token", response.data.userdata.access_token);
      navigate("/home");
    } catch (error) {
      setMessageError(error.response?.data?.message || "Error verifying code");
    }
  };

  return (
    <Grid container justifyContent={"center"} padding={5}>
      <h1>Verificar email {email}</h1>
      {messageError && (
        <Alert severity="error" onClose={() => setMessageError(null)}>
          {messageError}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Código de verificación" {...register("code", { required: true })} />
        <Button type="submit" variant="contained">Verificar</Button>
      </form>
    </Grid>
  );
};

export default VerifyEmail;
