import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DynamicTable from '../component/DynamicTable'
import HeaderDynamicTable from '../component/HeaderDynamicTable'
import axios from "axios";
const serverhost = "http://localhost:3000/";

const Users = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const modelSchemaUsers = {
    ID_USUARIO: {type: "string", header: "ID"},
    nombre: {type: "string", header: "Nombre"},
    mail: {type: "string", header: "Mail"},
    subscripto: {type: "boolean", header: "Subscripto"},
    vencimientoSubscripcion: {type: "date", header:" Vencimiento subscripcion"},
    fechaAlta: {type: "date", header:"Fecha de creacion"}
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(serverhost + "users", {
          withCredentials: true,
        });
        console.log(response.data)
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
      <HeaderDynamicTable model={modelSchemaUsers}/>

      {/* <DynamicTable/> */}

    </>
    
  )
}

export default Users