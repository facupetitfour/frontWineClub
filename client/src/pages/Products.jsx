import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DynamicTable from "../component/DynamicTable";
import HeaderDynamicTable from "../component/HeaderDynamicTable";

import axios from "axios";
import ModalProductAdd from "../component/modals add/modalProductAdd";

const serverhost = "http://localhost:3000/";

const Products = () => {
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([]);
  const [actualizador, setActualizador] = useState(0);

  const modelSchemaProducts = {
    _id: { type: "string", header: "ID" },
    name: { type: "string", header: "Nombre" },
    description: { type: "string", header: "Descripcion" },
    points_required: { type: "boolean", header: "Costo puntos" },
    stock: { type: "date", header: " Fecha alta" },
    createdAt: { type: "date", header: "Fecha Creacion" },
    img: { type: "img", header: "imagen" },
    avaiable: { type: "boolean", header: "disponible" },
  };

  const actualizarComponente = () => {
    setActualizador(actualizador + 1);
  };

  const createItem = (data) => {
    console.log(data);
    axios
      .post(serverhost + "products", data, { withCredentials: true })
      .then((response) => {
        console.log("Producto creado con éxito: ", response.data);
        actualizarComponente();
      })
      .catch((error) => {
        console.error(
          "Error al crear el producto: ",
          error.response.data.message
        );
      });
  };
  const updateItem = (id, data) => {
    axios
      .put(serverhost + `products/${id}`, data, { withCredentials: true })
      .then((response) => {
        console.log("Producto actualizado con éxito: ", response.data);
      })
      .catch((error) => {
        console.error(
          "Error al actualizar el producto: ",
          error.response.data.message
        );
      });
  };
  const deleteItem = (id) => {
    axios
      .delete(serverhost + `products/${id}`, { withCredentials: true })
      .then((response) => {
        console.log("Producto eliminado con éxito: ", response.data);
        actualizarComponente();
      })
      .catch((error) => {
        console.error(
          "Error al eliminar el producto: ",
          error.response.data.message
        );
      });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(serverhost + "products", {
          withCredentials: true,
        });
        console.log(response.data);
        setProductsData(response.data);
      } catch (error) {
        console.error("Error al obtener data de usuarios", error);
        navigate("/login");
      }
    };
    getData();
  }, [navigate, actualizador]);
  return (
    <>
      {productsData && productsData.length > 0 && modelSchemaProducts ? (
        <>
          <ModalProductAdd state={false} createItem={createItem}/>
          <DynamicTable
            bodyData={productsData}
            model={modelSchemaProducts}
            deleteFunction={deleteItem}
            updateItemFunction={updateItem}
          />
        </>
      ) : (
        <HeaderDynamicTable model={modelSchemaProducts} />
      )}
    </>
  );
};

export default Products;
