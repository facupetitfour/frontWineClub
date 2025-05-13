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
  IconButton,
  Box,
  Typography,
  Pagination,
  TextField,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  Tabs,
  Tab,
  InputAdornment,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import SearchIcon from "@mui/icons-material/Search"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import SortIcon from "@mui/icons-material/Sort"
import WarningModal from "./WarningModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Estilos personalizados
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  overflow: "hidden",
}))

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: "#B5CDB9",
  "& .MuiTableCell-head": {
    fontWeight: "bold",
    color: "#2E4033",
  },
}))
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F5F8F5",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#E8F0E9",
  },
  "&:hover": {
    backgroundColor: "#D9E2DA",
    transition: "background-color 0.2s ease",
  },
}))

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: "none",
  "&:before": {
    display: "none",
  },
  backgroundColor: "transparent",
}))
// Componente para mostrar el historial de puntos
const PointsHistory = ({ history }) => {
  if (!history || history.length === 0) return null
  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 0.5 }}>
        Historial de Puntos:
      </Typography>
      {history.map((entry, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          <Chip
            size="small"
            label={entry.action === "earn" ? "Ganado" : "Canjeado"}
            color={entry.action === "earn" ? "success" : "secondary"}
            sx={{ mr: 1, minWidth: 70 }}
          />
          <Typography variant="body2" sx={{ mr: 1 }}>
            {entry.points} pts
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(entry.date).toLocaleDateString()}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
// Nuevo componente para formatear el perfil
const ProfileDetails = ({ profile }) => {
  return (
    <Box sx={{ py: 1}}>
      {profile.name && profile.surname && (
        <Typography variant="subtitle1" sx={{ display:"flex", fontWeight: "bold" }}>
          {profile.name} {profile.surname}
        </Typography>
      )}

      {profile.points !== undefined && (
        <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            Puntos:
          </Typography>
          <Chip label={profile.points} color="primary" size="small" sx={{ fontWeight: "bold" }} />
        </Box>
      )}

      {profile.address && (
        <Box sx={{ display:"flex", mt: 0.5 }}>
          <Typography variant="body2">
            {profile.address.city && profile.address.country
              ? `${profile.address.city}, ${profile.address.country}`
              : null}
          </Typography>
        </Box>
      )}

      <StyledAccordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ p: 0, minHeight: 36 }}>
          <Typography variant="body2" color="primary">
            Ver historial de puntos
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0, pt: 1 }}>
          <PointsHistory history={profile.points_history} />
        </AccordionDetails>
      </StyledAccordion>
    </Box>
  );
};



const DynamicTable = (props) => { // prop a pasar en dinamic table; bodyData={data a renderizar} model={schema de data} deleteFunction={funcion} updateItemFunction={funcion}
  const [tabValue, setTabValue] = useState(0)
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

  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  }

  // Filtrar por búsqueda y por tab seleccionado
  useEffect(() => {
    if (!props.bodyData) return;
    let filteredData = [...props.bodyData];
    // Filtrar por búsqueda
    filteredData = filteredData.filter((item) => {
      return visibleFields.some((field) => {
        const fieldConfig = props.model[field];
        // Si el campo es anidado (ej. "profile.name")
        if (field.includes(".")) {
          const keys = field.split(".");
          let nestedValue = item;
          for (let key of keys) {
            if (!nestedValue) return false;
            nestedValue = nestedValue[key];
          }
          return (
            typeof nestedValue === "string" &&
            nestedValue.toLowerCase().includes(search.toLowerCase())
          );
        }
        const value = item[field];
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
        );
      });
    });

    // Ordenar si corresponde
    if (sortBy) {
      filteredData.sort((a, b) => {
        const getValue = (item) => {
          const keys = sortBy.split(".");
          return keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""), item);
        };

        let valueA = getValue(a);
        let valueB = getValue(b);

        if (typeof valueA === "number" && typeof valueB === "number") {
          return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
        } else {
          return sortOrder === "asc"
            ? String(valueA).localeCompare(String(valueB))
            : String(valueB).localeCompare(String(valueA));
        }
      });
    }
    setBodyFilterData(filteredData);
    setCurrentPage(1);
  }, [search, props.bodyData, sortBy, sortOrder, tabValue, props.model]);



  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleEdit = (data) => {
    props.updateItemFunction(data._id, data)
  }
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }
  const formatDate = (date) => {
    if (!date) return "-"
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }
  // const formatDate = (date) => {
  //   const dateObj = new Date(date);
  //   const day = dateObj.getUTCDate();
  //   const month = dateObj.getUTCMonth() + 1;
  //   const year = dateObj.getUTCFullYear();
  //   return `${day}/${month}/${year}`;
  // };


  // Determinar los campos visibles basados en el modelo
  const visibleFields =
    props.bodyData && props.bodyData.length > 0
      ? Object.keys(props.model).filter((field) => props.bodyData[0] && props.bodyData[0].hasOwnProperty(field))
      : []

  // Calcular los elementos de la página actual
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = bodyFilterData.slice(indexOfFirstRow, indexOfLastRow)


  return (
    <>
      <StyledTableContainer component={Paper}>
      <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center", backgroundColor: "#414141"}}>
      <TextField
          size="small"
          variant="filled"
          label="Buscar"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            disableUnderline: true,
          }}
          sx={{
            width: 250, backgroundColor:"#B5CDB9",
            '& .MuiFilledInput-root': {
              backgroundColor: 'transparent', // Elimina el fondo gris claro
            },
            '& .MuiFilledInput-root:hover': {
              backgroundColor: 'transparent', // También lo quita al hacer hover
            },
            '& .MuiFilledInput-root.Mui-focused': {
              backgroundColor: 'transparent', // También lo quita al hacer focus
            },
          }}
        />
      </Box>
        <Table sx={{ minWidth: "100%"}}>
        <StyledTableHead>
            <TableRow>
              {visibleFields.map((field) => (
                <TableCell align="center" key={field} onClick={() => handleSort(field)} sx={{ cursor: "pointer" }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {props.model[field].header}
                    {sortBy === field && (
                      <SortIcon
                        fontSize="small"
                        sx={{
                          ml: 0.5,
                          transform: sortOrder === "desc" ? "rotate(180deg)" : "none",
                        }}
                      />
                    )}
                  </Box>
                </TableCell>
              ))}
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {currentRows.length > 0 ? (
              currentRows.map((body, index) => (
                <StyledTableRow key={index}>
                  {visibleFields.map((field) => (
                    <TableCell key={field} align="center">
                      {field === "profile" ? (
                        <ProfileDetails profile={body[field]} />
                      ) : field === "date_register" ? (
                        formatDate(body[field])
                      ) : field === "email" ? (
                        <Typography variant="body2" sx={{ fontStyle: "italic", color: "#1976d2" }}>
                          {body[field]}
                        </Typography>
                      ) : field === "_id" ? (
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          {body[field].substring(0, 10)}...
                        </Typography>
                      ) : typeof body[field] === "boolean" ? (
                        <Chip
                          label={body[field] ? "Sí" : "No"}
                          color={body[field] ? "success" : "default"}
                          size="small"
                        />
                      ) : body[field] === null ? (
                        "-"
                      ) : (
                        body[field]
                      )}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <Tooltip title="Editar">
                      <IconButton onClick={() => handleEdit(body)} color="primary" size="small" sx={{ mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton
                        onClick={() => {
                          setWarningModal(true)
                          setItemToDelete(body)
                        }}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleFields.length + 1} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1">No se encontraron resultados</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>

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
