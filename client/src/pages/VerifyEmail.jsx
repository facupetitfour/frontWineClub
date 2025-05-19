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
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const serverhost = import.meta.env.VITE_BACK_URL;

const VerifyEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [messageError, setMessageError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  const navigate = useNavigate()
  const location = useLocation()
  const { userId, email } = location.state || {}

  // Redirect if no userId or email is provided
  useEffect(() => {
    if (!userId || !email) {
      navigate("/login", { replace: true })
    }
  }, [userId, email, navigate])

  // Handle resend cooldown timer
  useEffect(() => {
    let timer
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [resendCooldown])

  const onSubmit = async (data) => {
    setLoading(true)
    setMessageError(null)

    try {
      const response = await axios.post(`${serverhost}authenticate/verify-email`, {
        code: data.code,
        id: userId,
      })

      setSuccess(true)
      localStorage.setItem("access_token", response.data.userdata.access_token)

      // Redirect after a short delay to show success message
      setTimeout(() => {
        navigate("/home")
      }, 1500)
    } catch (error) {
      setMessageError(error.response?.data?.message || "Error al verificar el código. Por favor, inténtelo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (resendCooldown > 0) return

    setLoading(true)
    setMessageError(null)

    try {
      await axios.post(`${serverhost}authenticate/resend-code`, {
        id: userId,
        email: email,
      })
      setResendCooldown(60) // 60 seconds cooldown
    } catch (error) {
      setMessageError(error.response?.data?.message || "Error al reenviar el código. Por favor, inténtelo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

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
              setMessageError(null);
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
        <Grid item md={8} sx={{ display: { xs: "none", sm:"none",md:"block"} }}>
          <Box
            component="img"
            src="./public/img/imglogin.png"
            alt="Imagenlogin"
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container justifyContent={"center"} width={"100%"} padding={5} rowSpacing={4}>
              <Grid item xs={12}>
                <h1>Verificar Email</h1>
                <p>
                  Hemos enviado un código de verificación a <strong>{email || "tu correo"}</strong>.
                </p>
                <TextField
                  fullWidth
                  label="Código de verificación"
                  {...register("code", {
                    required: "El código es requerido",
                  })}
                  error={!!errors.code}
                  helperText={errors.code?.message}
                  disabled={loading || success}
                  autoFocus
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
                  <Button size="medium" onClick={handleResendCode} disabled={loading || resendCooldown > 0}>
                    {resendCooldown > 0 ? `Reenviar código (${resendCooldown}s)` : "Reenviar código"}
                  </Button>

                  <Button
                    type="submit"
                    size="medium"
                    variant="contained"
                    disabled={loading || success}
                    sx={{ minWidth: 100, height: 36, position: "relative" }}
                  >
                    {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Verificar"}
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

export default VerifyEmail;
