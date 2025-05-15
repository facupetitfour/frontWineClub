import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Button,
    CardActions,
    Box,
    Alert,
    Grid,
    TextField,
    Typography,
    CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const BACK_URL = import.meta.env.VITE_BACK_URL;

const EditProfile = () => {
    const [messageError, setMessageError] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("access_token");

    let userId;
    try {
        const decoded = token ? jwtDecode(token) : {};
        userId = decoded.sub;
    } catch (err) {
        // console.error("Invalid token", err);
    }

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: "",
            surname: "",
            city: "",
            postal_code: "",
            country: "",
            neighborhood: "",
            province: "",
            description: "",
        },
    });

    useEffect(() => {
        if (!userId) {
            navigate("/login");
            return;
        }

        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${BACK_URL}users/${userId}/userProfile`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const profile = response.data.profile || {};
                // seteado los valores del formulario
                reset({
                    name: profile.name || "",
                    surname: profile.surname || "",
                    city: profile.address.city || "",
                    postal_code: profile.address.postal_code || "",
                    country: profile.address.country || "",
                    neighborhood: profile.address.neighborhood || "",
                    province: profile.address.province || "",
                    description: profile.address.description || "",

                });
            } catch (error) {
                // console.error("Error fetching user data:", error);
                setMessageError(
                    error.response?.data?.message || "No se pudo cargar el perfil"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId, token, reset, navigate]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                name: data.name,
                surname: data.surname,
                address: {
                    city: data.city,
                    postal_code: data.postal_code,
                    country: data.country,
                    neighborhood: data.neighborhood,
                    province: data.province,
                    description: data.description,
                },
            };

            // Use PUT for updating existing resource
            await axios.put(
                `${BACK_URL}users/${userId}/profile`,
                payload,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            navigate("/home");
        } catch (error) {
            const msg = error.response?.data?.message || "Error inesperado";
            setMessageError(msg);
            // Map validation errors if provided
            if (error.response?.data?.errors) {
                Object.entries(error.response.data.errors).forEach(([field, msgs]) => {
                    setError(field, { type: "server", message: msgs.join(", ") });
                });
            }
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box p={3} maxWidth={600} mx="auto">
            <Typography variant="h4" align="center" gutterBottom>
                Editar Perfil
            </Typography>

            {messageError && (
                <Box mb={2} position="relative">
                    <Alert
                        variant="filled"
                        severity="error"
                        onClose={() => setMessageError(null)}
                    >
                        {messageError}
                    </Alert>
                </Box>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Nombre"
                            {...register("name", { required: "El nombre es requerido" })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Apellido"
                            {...register("surname", { required: "El apellido es requerido" })}
                            error={!!errors.surname}
                            helperText={errors.surname?.message}
                        />
                    </Grid>

                    {[
                        { name: "city", label: "Ciudad" },
                        { name: "postal_code", label: "Código Postal" },
                        { name: "country", label: "País" },
                        { name: "neighborhood", label: "Barrio" },
                        { name: "province", label: "Provincia" },
                    ].map((field) => (
                        <Grid item xs={12} key={field.name}>
                            <TextField
                                fullWidth
                                label={field.label}
                                {...register(field.name, {
                                    required: `${field.label} es requerido`,
                                })}
                                error={!!errors[field.name]}
                                helperText={errors[field.name]?.message}
                            />
                        </Grid>
                    ))}

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Descripción"
                            {...register("description", {
                                required: "La descripción es requerida",
                            })}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <CardActions sx={{ justifyContent: "space-between" }}>
                            <Button onClick={() => navigate(-1)}>Volver</Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Guardando..." : "Guardar"}
                            </Button>
                        </CardActions>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default EditProfile;