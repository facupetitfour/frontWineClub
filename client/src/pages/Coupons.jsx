import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DynamicTable from '../component/DynamicTable'
import HeaderDynamicTable from '../component/HeaderDynamicTable'
import axios from "axios";
const serverhost = "http://localhost:3000/";

const Coupons = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const modelSchemaCoupons = {
    id_cupon: {type: "string", header: "ID"},
    nombre: {type: "string", header: "Nombre"},
    descripcion: {type: "string", header: "descripcion"},
    valor: {type: "boolean", header: "valor"},
    fechaVencimiento: {type: "date", header:" Vencimiento"},
    bodega: {type: "string", header:"Bodega"}
  }

  // useEffect(() => {  
  //   const getData = async () => {
  //     try {
  //       const response = await axios.get(serverhost + "coupons", {
  //         withCredentials: true,
  //       });
  //       console.log(response.data)
  //       setData(response.data);
  //     } catch (error) {
  //       console.error("Error al obtener data de usuarios", error);
  //       navigate("/login");
  //     }
  //   };
  //   getData();
  // }, [navigate]);
  return (
    <>
      <HeaderDynamicTable model={modelSchemaCoupons}/>

      {/* <DynamicTable/> */}

    </>
    
  )
}

export default Coupons