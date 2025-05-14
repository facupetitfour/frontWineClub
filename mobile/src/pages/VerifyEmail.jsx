// "use client"

// import { useForm } from "react-hook-form"
// import axios from "axios"
// import { Alert, Box, Button, CircularProgress, Container, Grid, Paper, TextField, Typography } from "@mui/material"
// import { useState, useEffect } from "react"
// import { useNavigate, useLocation } from "react-router-dom"
// import EmailIcon from "@mui/icons-material/Email"

// const BACK_URL = import.meta.env.VITE_BACK_URL

// const VerifyEmail = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm()

//   const [messageError, setMessageError] = useState(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const [success, setSuccess] = useState(false)
//   const [resendCooldown, setResendCooldown] = useState(0)

//   const navigate = useNavigate()
//   const location = useLocation()
//   const { userId, email } = location.state || {}

//   // Redirect if no userId or email is provided
//   useEffect(() => {
//     if (!userId || !email) {
//       navigate("/login", { replace: true })
//     }
//   }, [userId, email, navigate])

//   // Handle resend cooldown timer
//   useEffect(() => {
//     let timer
//     if (resendCooldown > 0) {
//       timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
//     }
//     return () => clearTimeout(timer)
//   }, [resendCooldown])

//   const onSubmit = async (data) => {
//     setIsLoading(true)
//     setMessageError(null)

//     try {
//       const response = await axios.post(`${BACK_URL}/authenticate/verify-email`, {
//         code: data.code,
//         id: userId,
//       })

//       setSuccess(true)
//       localStorage.setItem("access_token", response.data.userdata.access_token)

//       // Redirect after a short delay to show success message
//       setTimeout(() => {
//         navigate("/home")
//       }, 1500)
//     } catch (error) {
//       setMessageError(error.response?.data?.message || "Error al verificar el código. Por favor, inténtelo de nuevo.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleResendCode = async () => {
//     if (resendCooldown > 0) return

//     setIsLoading(true)
//     setMessageError(null)

//     try {
//       await axios.post(`${BACK_URL}/authenticate/resend-code`, {
//         id: userId,
//         email: email,
//       })

//       setResendCooldown(60) // 60 seconds cooldown
//     } catch (error) {
//       setMessageError(error.response?.data?.message || "Error al reenviar el código. Por favor, inténtelo de nuevo.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 8, mb: 4 }}>
//         <Paper
//           elevation={3}
//           sx={{
//             p: 4,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Box
//             sx={{
//               backgroundColor: "primary.light",
//               borderRadius: "50%",
//               p: 2,
//               mb: 2,
//             }}
//           >
//             <EmailIcon fontSize="large" color="primary" />
//           </Box>

//           <Typography component="h1" variant="h5" gutterBottom>
//             Verificación de Email
//           </Typography>

//           <Typography variant="body1" align="center" color="text.secondary" paragraph>
//             Hemos enviado un código de verificación a <strong>{email || "tu correo"}</strong>. Por favor, introduce el
//             código para verificar tu cuenta.
//           </Typography>

//           {messageError && (
//             <Alert severity="error" onClose={() => setMessageError(null)} sx={{ width: "100%", mb: 2 }}>
//               {messageError}
//             </Alert>
//           )}

//           {success && (
//             <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
//               ¡Verificación exitosa! Redirigiendo...
//             </Alert>
//           )}

//           <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: "100%", mt: 1 }}>
//             <TextField
//               margin="normal"
//               fullWidth
//               label="Código de verificación"
//               {...register("code", {
//                 required: "El código es requerido",
//                 pattern: {
//                   value: /^[0-9]+$/,
//                   message: "Solo se permiten números",
//                 },
//                 minLength: {
//                   value: 6,
//                   message: "El código debe tener al menos 6 dígitos",
//                 },
//               })}
//               error={!!errors.code}
//               helperText={errors.code?.message}
//               disabled={isLoading || success}
//               autoFocus
//             />

//             <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isLoading || success}>
//               {isLoading ? <CircularProgress size={24} /> : "Verificar"}
//             </Button>

//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <Button variant="text" onClick={() => navigate("/login")} disabled={isLoading} fullWidth>
//                   Volver al inicio
//                 </Button>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Button variant="text" onClick={handleResendCode} disabled={isLoading || resendCooldown > 0} fullWidth>
//                   {resendCooldown > 0 ? `Reenviar código (${resendCooldown}s)` : "Reenviar código"}
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </Paper>
//       </Box>
//     </Container>
//   )
// }

// export default VerifyEmail
"use client"

import { useForm } from "react-hook-form"
import axios from "axios"
import { Alert, Box, Button, CardActions, CircularProgress, Grid, TextField } from "@mui/material"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const BACK_URL = import.meta.env.VITE_BACK_URL

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
      const response = await axios.post(`${BACK_URL}authenticate/verify-email`, {
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
      await axios.post(`${BACK_URL}authenticate/resend-code`, {
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
        <Box sx={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
          <Alert
            variant="filled"
            severity="error"
            onClose={() => setMessageError(null)}
            sx={{ position: "absolute", zIndex: 10, maxWidth: "90%", width: "auto" }}
          >
            {messageError}
          </Alert>
        </Box>
      )}

      {success && (
        <Box sx={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
          <Alert
            variant="filled"
            severity="success"
            sx={{ position: "absolute", zIndex: 10, maxWidth: "90%", width: "auto" }}
          >
            ¡Verificación exitosa! Bienvenido a WineClub Redirigiendo..
          </Alert>
        </Box>
      )}

      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid item xs={12} bgcolor={"white"} zIndex={2} marginTop={"10%"}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <img style={{ height: 250 }} src="/logotipo.png" alt="Logo" />
          </Grid>

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
  )
}

export default VerifyEmail
