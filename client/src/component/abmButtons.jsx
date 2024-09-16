import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import "../../public/abmButtons.css";

export default function AbmButtons(props) {
    const itemSelected = props.item;
    const abmProveniente = props.abm;
    const funcionAbmProveniente = props.funcion;
    const isAdmin = props.role;
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="btn-position">
                <>
                    {itemSelected ? (
                        <Link to={`edit/${itemSelected}`}>
                            <IconButton color="primary">
                                <EditIcon />
                            </IconButton>
                        </Link>
                    ) : (
                        <IconButton color="primary" disabled>
                            <EditIcon />
                        </IconButton>
                    )}

                    <Link to={`add`}>
                        <IconButton color="primary">
                            <AddIcon />
                        </IconButton>
                    </Link>

                    {abmProveniente === "unidades" ? (
                        <IconButton color="error" onClick={handleOpen} disabled>
                            <DeleteIcon />
                        </IconButton>
                    ) : (
                        <IconButton color="error" onClick={handleOpen}>
                            <DeleteIcon />
                        </IconButton>
                    )}

                    {abmProveniente === "productos" && <CargaViaExcel />}

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth
                        maxWidth="xs"
                    >
                        <DialogTitle id="alert-dialog-title">Eliminar</DialogTitle>
                        <DialogContent>
                            ¿Está seguro que desea eliminar este item?
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                                Cancelar
                            </Button>
                            <Button onClick={funcionAbmProveniente} color="error">
                                Eliminar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
        </div>
    );
}
