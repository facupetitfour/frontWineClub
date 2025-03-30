import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DynamicTable from "../component/DynamicTable";
import HeaderDynamicTable from "../component/HeaderDynamicTable";
import axios from "axios";
const serverhost = "http://localhost:3000/";

const Avaiable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const modelSchemaAvaiable = {
    type: { type: "string", header: "Tipo" },
    name: { type: "string", header: "Nombre" },
    code: { type: "string", header: "Codigo" },
    stock: { type: "number", header: "Stock" },
    userID: {
      type: "string",
      header: "UserID",
    },
    // fechaAlta: { type: "date", header: "Fecha de creacion" },
  };

  const updateItem = (id, data) => {
    axios
      .put(serverhost + `coupons/${id}`, data)
      .then((response) => {
        console.log("Cupon actualizado con éxito: ", response.data);
      })
      .catch((error) => {
        console.error(
          "Error al actualizar el cupon: ",
          error.response.data.message
        );
      });
  };


  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(serverhost + "api-rest", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Error al obtener data", error);
        // navigate("/");
      }
    };
    getData();
  }, [navigate]);
  return (
    <>
      {data && data.length > 0 && modelSchemaAvaiable ? (
        <>
          <DynamicTable
            bodyData={data}
            model={modelSchemaAvaiable}
            // deleteFunction={deleteItem}
            updateItemFunction={updateItem}
          />
        </>
      ) : (
        <HeaderDynamicTable model={modelSchemaAvaiable} />
      )}
    </>
  );
};

export default Avaiable;
