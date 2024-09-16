/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
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
  ImageList,
  ImageListItem,
} from "@mui/material";
import WarningModal from "./WarningModal";
import FilterTable from "./FilterTable";
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

const DynamicTable = (props) => {
  const [warningModal, setWarningModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [search, setSearch] = useState("");
  const [bodyFilterData, setBodyFilterData] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [sortOrder, setSortOrder] = useState("asc");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sortedData = [...bodyFilterData].sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    } else if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else if (typeof valueA === "boolean" && typeof valueB === "boolean") {
      return sortOrder === "asc"
        ? (valueA ? 1 : 0) - (valueB ? 1 : 0)
        : (valueB ? 1 : 0) - (valueA ? 1 : 0);
    } else {
      return 0;
    }
  });

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
    }
  }, [search, props.bodyData]);

  const handleSearch = (searchText) => {
    setSearch(searchText);
  };

  const handleWarningModal = (data) => {
    setWarningModal(!warningModal);
    setItemToDelete(data);
  };

  const handleDeleteClick = (data) => {
    props.deleteFunction(data);
    setWarningModal(!warningModal);
  };

  const handleUpdateClick = (item) => {
    props.updateItemFunction(item, true);
  };

  const handleSort = (field) => {
    setSortBy(field);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleToggleImage = (index) => {
    setShowImage((prevShowImage) => ({
      ...prevShowImage,
      [index]: !prevShowImage[index],
    }));
  };

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  const visibleFields = Object.keys(props.model).filter((field) =>
    props.bodyData[0].hasOwnProperty(field)
  );

  return (
    <>
      {/* <FilterTable onSearch={handleSearch} /> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100%", bgcolor: "" }}>
          <TableHead sx={{ bgcolor: "#B5CDB9" }}>
            <TableRow>
              {/* Mapea las cabeceras desde el modelo */}
              {visibleFields.map((field) => (
                <TableCell align="center" key={field}>
                  {props.model[field].header}
                </TableCell>
              ))}
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ bgcolor: "#D9E2DA" }}>
            {sortedData.map((body, index) => (
              <TableRow key={index} hover>
                {visibleFields.map((field) => (
                  <TableCell key={field} align="center">
                    {field === "imagen" ? (
                      <Avatar />
                    ) : props.model[field].type === "date" ? (
                      formatDate(body[field])
                    ) : typeof body[field] === "boolean" ? (
                      body[field] ? (
                        "Sí"
                      ) : (
                        "No"
                      )
                    ) : body[field] === null ? (
                      "-"
                    ) : props.model[field].type === "img" ? (
                      <>
                        <Button onClick={handleOpen}>Ver</Button>
                        <Modal open={open} onClose={handleClose}>
                          <Box sx={style}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                            >
                              Item Imagenes
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignContent: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                              >
                                <ImageList cols={1}>
                                  <ImageListItem>
                                    <img src={body[field]} alt="imagen" />
                                  </ImageListItem>
                                </ImageList>
                              </Typography>
                            </Box>
                          </Box>
                        </Modal>
                      </>
                    ) : (
                      JSON.stringify(body[field])
                    )}
                  </TableCell>
                ))}
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleUpdateClick(body)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleWarningModal(body)}
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

      <WarningModal
        warning={warningModal}
        cancelWarningModal={handleWarningModal}
        confirmDelete={() => handleDeleteClick(itemToDelete)}
      />
    </>
  );
};

export default DynamicTable;
