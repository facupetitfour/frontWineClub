import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Rating,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useForm, Controller } from "react-hook-form";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Carousel from "./component/Carrusel";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BACK_URL = import.meta.env.VITE_BACK_URL;

const ClaimView = () => {
  const location = useLocation();
  const item = location.state?.data || {};
  const profile = location.state?.profile || {};
  const [comment, setComments] = useState(item.opinion || null);
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm();

  const handleCommentSubmit = (data) => {
    const token = localStorage.getItem("access_token");
    const { sub } = jwtDecode(token);
    const comment = {
      username: profile.name + ' ' + profile.surname,
      valorate: data.valorate,
      date: new Date(),
      description: data.description,
    };
    console.log(comment)
    setComments(comment);
    console.log("FLAG DATA SEND", {
      id: sub,
      item: item,
      comment: {
        username: comment.username,
        valorate: comment.valorate,
        date: comment.date,
        description: comment.description,
      }
    })

    axios.post(`${BACK_URL}api-rest/commentClaimItem`, {
      userID: sub,
      item: item,
      comment: {
        username: comment.username,
        valorate: comment.valorate,
        date: comment.date,
        description: comment.description,
      },
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => reset()).catch((err) => console.error("Error al enviar comentario", err));
  };
  useEffect(() => {
    console.log("Comment updated:", comment);
  }, [comment]);
  return (
    <>
      {item ? (
        <Box sx={{ minHeight: "100vh", minWidth: "100%", padding: 2 }}>
          <Card sx={{ marginBottom: 3, borderRadius: 3, boxShadow: 3 }}>
            <CardMedia height="200">
              <Carousel imagenesBodega={item.img} />
            </CardMedia>

            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" component="div" noWrap>{item.name}</Typography>
                <Box display="flex" alignItems="center">
                  <LocalMallIcon sx={{ mr: 0.5 }} />
                  <Typography variant="h6" component="div">{item.points_required}</Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>

              <Button
                sx={{ mt: 4 }}
                size="large"
                fullWidth
                variant="contained"
                disableElevation
              >
                {item.code}
              </Button>
            </CardContent>

            <Box sx={{ display: "flex", flexDirection: "column", padding: 2 }}>
              <List>
                {comment ? (

                  <Box>
                    <List disablePadding>
                    <Divider component="li" />

                      {/* Reviews Section */}
                      <ListItem
                        sx={{
                          flexDirection: "column",
                        }}
                      >
                        <Box sx={{ minWidth: "100%" }}>
                          <Box
                            sx={{ display: "flex", justifyContent: "space-between" }}
                          >
                            <Typography
                              variant="subtitle2"
                              color="text.primary"
                              fontWeight="bold"
                            >
                              {comment.username}
                            </Typography>
                            <Box display="flex" alignItems="center">
                              {[...Array(comment.valorate)].map((_, index) => (
                                <StarIcon
                                  key={index}
                                  fontSize="small"
                                  sx={{ color: "#FFD700" }}
                                />
                              ))}
                            </Box>
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {comment.description}
                            </Typography>
                          </Box>
                        </Box>
                      </ListItem>
                    </List>
                    <Divider component="li" />
                  </Box>
                ) : (
                  <Box component="form" onSubmit={handleSubmit(handleCommentSubmit)} sx={{ mt: 2 }}>
                    <Controller
                      name="valorate"
                      control={control}
                      defaultValue={0}
                      rules={{ required: "La valoración es obligatoria" }}
                      render={({ field }) => (
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <Typography variant="body1" sx={{ mr: 1 }}>Tu valoración:</Typography>
                          <Rating
                            {...field}
                            value={field.value}
                            onChange={(_, value) => field.onChange(value)}
                          />
                          {errors.valorate && (
                            <Typography color="error" variant="body2" sx={{ ml: 2 }}>
                              {errors.valorate.message}
                            </Typography>
                          )}
                        </Box>
                      )}
                    />

                    <TextField
                      fullWidth
                      label="Escribe un comentario..."
                      variant="outlined"
                      multiline
                      rows={3}
                      {...register("description", { required: "El comentario es requerido" })}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />

                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button sx={{ mt: 2 }} variant="outlined" type="submit">
                        Comentar
                      </Button>
                    </Box>
                  </Box>
                )}
              </List>


            </Box>
          </Card>
        </Box>
      ) : null}
    </>
  );
};

export default ClaimView;
