import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DynamicTable from "../component/DynamicTable";

import HeaderDynamicTable from "../component/HeaderDynamicTable";
import axios from "axios";

const serverhost = import.meta.env.VITE_BACK_URL;

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
    email: { type: "string", header: "E-mail" },
    username: { type: "string", header: "Username" },
    profile: {type:"string", header: "Profile"},
    date_register: { type: "date", header: "Fecha de Registro" },
  };
  const modelSchemaBodega = {
    _id: { type: "string", header: "ID" },
    email: { type: "string", header: "E-mail" },
    username: { type: "string", header: "Username" },
    profile: {type:"string", header: "Profile"},
    date_register: { type: "date", header: "Fecha de Registro" },
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem('access_token')
        const response = await axios.get(serverhost + "users",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        console.log(response.data);
        setData(response.data);
        setBodegaData(response.data.filter((data) => data.roles === "bodega"));
        setClientData(response.data.filter((data) => data.roles === "cliente"));
      } catch (error) {
        console.error("Error al obtener data de usuarios", error);
        // navigate("/");
      }
    };
    getData();
  }, [navigate]);
  return (
    <>
      <Box sx={{ display:"flex", bgcolor: "#D9E2DA", width: "fit-content", borderTopLeftRadius:"5px", borderTopRightRadius:"5px", justifyContent:"end", marginBottom:-6}}>
        <Tabs
          value={value}
          onChange={handleChange}
        >
          <Tab value="cliente" label="Clientes" sx={{bgcolor:"#D9E2DA","&.Mui-selected": { bgcolor: "#B5CDB9"},}}/>
          <Tab value="bodega" label="Bodegas" sx={{bgcolor:"#D9E2DA","&.Mui-selected": { bgcolor: "#B5CDB9",}}}/>
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
