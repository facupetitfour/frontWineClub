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
  const modelSchemaUsers = {
    _id: { type: "string", header: "ID" },
    name: { type: "string", header: "Nombre" },
    subname: { type: "string", header: "Apellido" },
    email: { type: "string", header: "E-mail" },
    points: {
      type: "number",
      header: "Puntos",
    },
    emailVerify: { type: "boolean", header: "Mail verificado" },
    lastSesion: { type: "date", header: "Ultima sesion" },

  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(serverhost + "users", {
          withCredentials: true,
        });
        setData(response.data);
      } catch (error) {
        console.error("Error al obtener data de usuarios", error);
        navigate("/login");
      }
    };
    getData();
  }, [navigate]);
  return (
    <>
      <Box sx={{ width: "100%", flexDirection: "column" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab value="cliente" label="Clientes" wrapped />
          <Tab value="bodega" label="Bodegas" />
        </Tabs>
        {data && data.length > 0 && modelSchemaUsers ? (
          <>
            {value === "cliente" ? (
              <DynamicTable bodyData={data} model={modelSchemaUsers} />
            ) : null
            }
            {value === "bodega" ? (
              <DynamicTable bodyData={data} model={modelSchemaUsers} />
            ) : null}
          </>
        ) : (
          <HeaderDynamicTable model={modelSchemaUsers} />
        )}
      </Box>
    </>
  );
};

export default Users;
