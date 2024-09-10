import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DynamicTable from '../component/DynamicTable'
import HeaderDynamicTable from '../component/HeaderDynamicTable'
import axios from "axios";
const serverhost = "http://localhost:3000/";

const Products = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const modelSchemaProducts = {
    ID_Producto: {type: "string", header: "ID"},
    nombre: {type: "string", header: "Nombre"},
    Descripcion: {type: "string", header: "Descripcion"},
    ValorPuntos: {type: "boolean", header: "Costo puntos"},
    creacionProducto: {type: "date", header:" Fecha alta"},
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(serverhost + "products", {
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
      <HeaderDynamicTable model={modelSchemaProducts}/>

      {/* <DynamicTable/> */}

    </>
    
  )
}

export default Products