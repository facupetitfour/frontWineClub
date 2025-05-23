import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton"; // 👈 importamos Skeleton
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
  const [loading, setLoading] = useState(true); // 👈 nuevo estado

  const modelSchemaUsers = {
    _id: { type: "string", header: "ID" },
    email: { type: "string", header: "E-mail" },
    username: { type: "string", header: "Username" },
    profile: { type: "string", header: "Profile" },
    date_register: { type: "date", header: "Fecha de Registro" },
  };

  const modelSchemaBodega = { ...modelSchemaUsers }; // reutilizamos el mismo esquema

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(serverhost + "users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        setBodegaData(response.data.filter((data) => data.roles === "bodega"));
        setClientData(response.data.filter((data) => data.roles === "cliente"));
      } catch (error) {
        console.error("Error al obtener data de usuarios", error);
      } finally {
        setLoading(false); // 👈 desactiva loading
      }
    };
    getData();
  }, [navigate]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          bgcolor: "#4E1F5A",
          width: "fit-content",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          justifyContent: "end",
          marginBottom: -6,
        }}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab
            value="cliente"
            label="Clientes"
            sx={{
              bgcolor: "#DFC8E7",
              color: "#4E1F5A",
              "&.Mui-selected": {
                bgcolor: "#7C4A8E",
                color: "#F8F3FA",
              },
            }}
          />
          <Tab
            value="bodega"
            label="Bodegas"
            sx={{
              bgcolor: "#DFC8E7",
              color: "#4E1F5A",
              "&.Mui-selected": {
                bgcolor: "#7C4A8E",
                color: "#F8F3FA",
              },
            }}
          />
        </Tabs>
      </Box>

      {loading ? (
        // 🟣 Skeleton de tabla simulada
        <Box sx={{ p: 2 }}>
          <Skeleton variant="rectangular" height={50} sx={{ mb: 1 }} />
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={40} sx={{ mb: 1 }} />
          ))}
        </Box>
      ) : data && data.length > 0 ? (
        <>
          {value === "cliente" && (
            <DynamicTable bodyData={clientData} model={modelSchemaUsers} />
          )}
          {value === "bodega" && (
            <DynamicTable bodyData={bodegaData} model={modelSchemaBodega} />
          )}
        </>
      ) : (
        <Box sx={{ p: 2 }}>
          <HeaderDynamicTable model={modelSchemaUsers} />
        </Box>
      )}
    </>
  );
};

export default Users;
