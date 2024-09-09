/* eslint-disable react/prop-types */

import { Table, TableHead, TableRow, TableCell, Paper, Box } from '@mui/material';

const HeaderDynamicTable = (props) => {
  
  // Filtra las propiedades del modelo para obtener solo las que están presentes en el bodyData

  const visibleFields = Object.keys(props.model);
  return (
    <>
    <Box sx={{minWidth:'100%',overflowX: 'auto'}}>
      <Paper sx={{ overflowX: 'auto' }}>
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
        </Table>
      </Paper>
    </Box>

    </>
  );
};

export default HeaderDynamicTable;
