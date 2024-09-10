/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Avatar, TableSortLabel } from '@mui/material';
import WarningModal from "./WarningModal";
import FilterTable from "./FilterTable";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const DynamicTable = (props) => {
  const [warningModal, setWarningModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [search, setSearch] = useState("");
  const [bodyFilterData, setBodyFilterData] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [sortOrder, setSortOrder] = useState("asc");

  const sortedData = [...bodyFilterData].sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    } else if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    } else if (typeof valueA === "boolean" && typeof valueB === "boolean") {
      return sortOrder === "asc" ? (valueA ? 1 : 0) - (valueB ? 1 : 0) : (valueB ? 1 : 0) - (valueA ? 1 : 0);
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
        <Table sx={{ minWidth: '100%' }}>
        <TableHead>
            <TableRow sx={{ backgroundColor: 'gray.200' }}>
              {/* Mapea las cabeceras desde el modelo */}
              {visibleFields.map((field) => (
                <TableCell align="center" key={field}>
                  {props.model[field].header}
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((body, index) => (
              <TableRow key={index} hover>
                {console.log("FLAAAAG",body)}
                {visibleFields.map((field) => (
                  <TableCell key={field} align="center">
                    {console.log()}
                    {field === "imagen" ? (
                      <Avatar
                      />
                    ) : field.type === "date" ? (
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
