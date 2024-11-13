/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Avatar,
  Box,
  Modal,
  Typography,
  Pagination, // Importar componente de paginación de MUI
} from "@mui/material";
import WarningModal from "./WarningModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Nuevo componente para formatear el perfil
const ProfileDetails = ({ profile }) => {
  return (
    <Box sx={{ whiteSpace: "pre-wrap", textAlign: "left", fontSize: "0.875rem" }}>
      <Typography variant="subtitle2">Name: {profile.name} {profile.surname}</Typography>
      <Typography variant="body2">Points: {profile.points}</Typography>
      <Typography variant="body2">Address: {profile.address.city}, {profile.address.country}</Typography>
      <Typography variant="body2" gutterBottom>Postal Code: {profile.address.postal_code}</Typography>
      <Typography variant="body2" gutterBottom>Description: {profile.description}</Typography>
      <Typography variant="body2">Points History:</Typography>
      {profile.points_history.map((entry, index) => (
        <Box key={index} sx={{ ml: 2 }}>
          <Typography variant="body2" color="textSecondary">
            {index + 1}. {entry.action} - Points: {entry.points} - Date: {new Date(entry.date).toLocaleDateString()}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

const DynamicTable = (props) => {
  const [warningModal, setWarningModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [search, setSearch] = useState("");
  const [bodyFilterData, setBodyFilterData] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [sortOrder, setSortOrder] = useState("asc");
  const [open, setOpen] = useState(false);

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Número de filas por página

  useEffect(() => {
    if (props.bodyData) {
      const searchFilterData = props.bodyData.filter((item) => {
        return (
          Object.keys(item).some(
            (key) =>
              typeof item[key] === "string" &&
              item[key].toLowerCase().includes(search.toLowerCase())
          ) ||
          new Date(item.createdAt).toLocaleDateString("es-AR").includes(search)
        );
      });
      setBodyFilterData(searchFilterData);
      setCurrentPage(1); // Reiniciar a la primera página tras filtrar
    }
  }, [search, props.bodyData]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  const visibleFields = props.bodyData && props.bodyData.length > 0
    ? Object.keys(props.model).filter((field) =>
        props.bodyData[0] && props.bodyData[0].hasOwnProperty(field)
      )
    : []; // Si props.bodyData está vacío o es undefined, devolvemos un arreglo vacío

  // Calcular los elementos de la página actual
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = bodyFilterData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100%", bgcolor: "" }}>
          <TableHead sx={{ bgcolor: "#B5CDB9" }}>
            <TableRow>
              {visibleFields.map((field) => (
                <TableCell align="center" key={field}>
                  {props.model[field].header}
                </TableCell>
              ))}
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ bgcolor: "#D9E2DA" }}>
            {currentRows.map((body, index) => (
              <TableRow key={index} hover>
                {visibleFields.map((field) => (
                  <TableCell key={field} align="center">
                    {field === "profile" ? (
                      <ProfileDetails profile={body[field]} />
                    ) : props.model[field].type === "date" ? (
                      formatDate(body[field])
                    ) : typeof body[field] === "boolean" ? (
                      body[field] ? "Sí" : "No"
                    ) : body[field] === null ? (
                      "-"
                    ) : (
                      JSON.stringify(body[field])
                    )}
                  </TableCell>
                ))}
                <TableCell align="center">
                  <IconButton
                    onClick={() => props.updateItemFunction(body)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setWarningModal(true);
                      setItemToDelete(body);
                    }}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Controles de Paginación */}
      <Pagination
        count={Math.ceil(bodyFilterData.length / rowsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
        color="primary"
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />

      <WarningModal
        warning={warningModal}
        cancelWarningModal={() => setWarningModal(false)}
        confirmDelete={() => {
          props.deleteFunction(itemToDelete._id);
          setWarningModal(false);
        }}
      />
    </>
  );
};

export default DynamicTable;
