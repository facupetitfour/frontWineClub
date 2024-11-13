// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import DynamicTable from '../component/DynamicTable'
// import HeaderDynamicTable from '../component/HeaderDynamicTable'
// import axios from "axios";
// const serverhost = "http://localhost:3000/";

// const Coupons = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);

//   // useEffect(() => {
//   //   const getData = async () => {
//   //     try {
//   //       const response = await axios.get(serverhost + "coupons", {
//   //         withCredentials: true,
//   //       });
//   //       console.log(response.data)
//   //       setData(response.data);
//   //     } catch (error) {
//   //       console.error("Error al obtener data de usuarios", error);
//   //       navigate("/login");
//   //     }
//   //   };
//   //   getData();
//   // }, [navigate]);

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DynamicTable from "../component/DynamicTable";
import HeaderDynamicTable from "../component/HeaderDynamicTable";
import {
  Modal,
  Box,
  TextField,
  Button,
  Fab,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import axios from "axios";

const serverhost = "http://localhost:3000/";

const Coupons = () => {
  const navigate = useNavigate();
  const [couponsData, setCouponsData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [actualizador, setActualizador] = useState(0);

  const modelSchemaCoupons = {
    _id: { type: "string", header: "ID" },
    name: { type: "string", header: "Nombre" },
    description: { type: "string", header: "Descripcion" },
    points_required: { type: "boolean", header: "Costo puntos" },
    stock: { type: "date", header: " Fecha alta" },
    createdAt: { type: "date", header: "Fecha Creacion" },
    img: { type: "img", header: "imagen" },
    avaiable: { type: "boolean", header: "disponible" },
    expiration_date: { type: "date", header: "Fecha expiracion" },
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createItem(data);
  };

  const actualizarComponente = () => {
    setActualizador(actualizador + 1);
  };

  const createItem = (data) => {
    console.log(data);
    axios
      .post(serverhost + "coupons", data)
      .then((response) => {
        console.log("Cupon creado con éxito: ", response.data);
        handleClose();
        actualizarComponente();
      })
      .catch((error) => {
        console.error("Error al crear el cupon: ", error.response.data.message);
      });
  };
  const updateItem = (id, data) => {
    axios
      .put(serverhost + `coupons/${id}`, data)
      .then((response) => {
        console.log("Cupon actualizado con éxito: ", response.data);
      })
      .catch((error) => {
        console.error(
          "Error al actualizar el cupon: ",
          error.response.data.message
        );
      });
  };
  const deleteItem = (id) => {
    axios
      .delete(serverhost + `coupons/${id}`)
      .then((response) => {
        console.log("Cupon eliminado con éxito: ", response.data);
        actualizarComponente();
      })
      .catch((error) => {
        console.error(
          "Error al eliminar el cupon: ",
          error.response.data.message
        );
      });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(serverhost + "coupons", {
          withCredentials: true,
        });
        console.log(response.data);
        setCouponsData(response.data);
      } catch (error) {
        console.error("Error al obtener data de usuarios", error);
        navigate("/");
      }
    };
    getData();
  }, [navigate, actualizador]);
  return (
    <>
      {/* Botón flotante */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      {couponsData && couponsData.length > 0 && modelSchemaCoupons ? ( //
        <>
          {/* Modal */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                maxWidth: "500px",
                width: "100%",
              }}
            >
              <Card>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <CardHeader title="Agregar Producto" />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <TextField
                      label="Nombre"
                      {...register("name", { required: true })}
                      error={!!errors.name}
                      helperText={errors.name && "El nombre es requerido"}
                    />
                    <TextField
                      label="Descripción"
                      {...register("description", { required: true })}
                      error={!!errors.description}
                      helperText={
                        errors.description && "La descripción es requerida"
                      }
                    />
                    <TextField
                      label="Imagen URL"
                      {...register("img", { required: true })}
                      error={!!errors.img}
                      helperText={errors.img && "La imagen es requerida"}
                    />
                    <TextField
                      label="Fecha de Expiración"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      {...register("expiration_date", { required: true })}
                      error={!!errors.expiration_date}
                      helperText={
                        errors.expiration_date &&
                        "La fecha de expiración es requerida"
                      }
                    />
                    <TextField
                      label="Puntos requeridos"
                      type="number"
                      {...register("points_required", { required: true })}
                      error={!!errors.points_required}
                      helperText={
                        errors.points_required && "Este campo es requerido"
                      }
                    />
                    <FormControl>
                      <InputLabel id="available-label">Disponible</InputLabel>
                      <Select
                        labelId="available-label"
                        defaultValue={true}
                        {...register("available", { required: true })}
                      >
                        <MenuItem value={true}>Sí</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <InputLabel id="approved-label">Aprobado</InputLabel>
                      <Select
                        labelId="approved-label"
                        defaultValue={true}
                        {...register("approved", { required: true })}
                      >
                        <MenuItem value={true}>Sí</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <InputLabel id="bodega-label">Bodega</InputLabel>
                      <Select
                        labelId="bodega-label"
                        {...register("bodega_id", { required: true })}
                        defaultValue=""
                      >
                        <MenuItem value="66e0b51eb876bff21898ae2b">
                          Bodega 1
                        </MenuItem>
                        <MenuItem value="2" disabled>
                          Bodega 2
                        </MenuItem>
                        <MenuItem value="3" disabled>
                          Bodega 3
                        </MenuItem>
                        {/* Añadir más opciones según sea necesario */}
                      </Select>
                    </FormControl>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit" variant="contained" color="primary">
                      Crear Cupon
                    </Button>
                  </CardActions>
                </form>
              </Card>
            </Box>
          </Modal>
          <DynamicTable
            bodyData={couponsData}
            model={modelSchemaCoupons}
            deleteFunction={deleteItem}
            updateItemFunction={updateItem}
          />
        </>
      ) : (
        <HeaderDynamicTable model={modelSchemaCoupons} />
      )}
    </>
  );
};

export default Coupons;
