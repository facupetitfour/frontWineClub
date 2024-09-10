import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DynamicTable from "../component/DynamicTable";

import HeaderDynamicTable from "../component/HeaderDynamicTable";
import axios from "axios";

const serverhost = "http://localhost:3000/";

const Users = () => {
  const [value, setValue] = useState("cliente");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [bodegaData, setBodegaData] = useState([]);

  const modelSchemaUsers = {
    _id: { type: "string", header: "ID" },
    name: { type: "string", header: "Nombre" },
    subname: { type: "string", header: "Apellido" },
    email: { type: "string", header: "E-mail" },
    points: { type: "number", header: "Puntos" },
    emailVerify: { type: "boolean", header: "Mail verificado" },
    lastSesion: { type: "date", header: "Ultima sesion" },
  };
  const modelSchemaBodega = {
    _id: { type: "string", header: "ID" },
    email: { type: "string", header: "E-mail" },
    emailVerify: { type: "boolean", header: "Mail verificado" },
    lastSesion: { type: "date", header: "Ultima sesion" },
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(serverhost + "users", {
          withCredentials: true,
        });
        console.log(response.data);
        setData(response.data);
        setBodegaData(response.data.filter((data) => data.rol === "bodega"));
        setClientData(response.data.filter((data) => data.rol === "cliente"));
      } catch (error) {
        console.error("Error al obtener data de usuarios", error);
        navigate("/login");
      }
    };
    getData();
  }, [navigate]);
  return (
    <>
      <Box sx={{ bgcolor: "#D9E2DA", width: "fit-content", borderTopLeftRadius:"5px", borderTopRightRadius:"5px"}}>
        <Tabs
          value={value}
          onChange={handleChange}
        >
          <Tab value="cliente" label="Clientes" sx={{"&.Mui-selected": { bgcolor: "#B5CDB9"}}}/>
          <Tab value="bodega" label="Bodegas" sx={{"&.Mui-selected": { bgcolor: "#B5CDB9",}}}/>
        </Tabs>
      </Box>

      {data && data.length > 0 && modelSchemaUsers ? (
        <>
          {value === "cliente" ? (
            <DynamicTable bodyData={clientData} model={modelSchemaUsers} />
          ) : null}
          {value === "bodega" ? (
            <DynamicTable bodyData={bodegaData} model={modelSchemaBodega} />
          ) : null}
        </>
      ) : (
        <HeaderDynamicTable model={modelSchemaUsers} />
      )}
    </>
  );
};

export default Users;
