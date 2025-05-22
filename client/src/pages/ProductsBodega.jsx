import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DynamicTable from "../component/DynamicTable";
import HeaderDynamicTable from "../component/HeaderDynamicTable";
import axios from "axios";
import ModalProductAddOrEditForBodega from "../component/modals add/modalProductAddOrEditForBodega";
import { jwtDecode } from "jwt-decode";

const serverhost = import.meta.env.VITE_BACK_URL;

const ProductsBodega = () => {
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([]);
  const [actualizador, setActualizador] = useState(0);
  const [dataUsers, setDataUsers] = useState(null);
  const [dataCategories, setDataCategories] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // Para el producto seleccionado
  const [openModal, setOpenModal] = useState(false); // Para el control del modal

  const modelSchemaProducts = {
    _id: { type: "string", header: "ID" },
    name: { type: "string", header: "Nombre" },
    description: { type: "string", header: "Descripcion" },
    points_required: { type: "boolean", header: "Costo puntos" },
    stock: { type: "date", header: "Stock" },
    createdAt: { type: "date", header: "Fecha Creacion" },
    img: { type: "img", header: "Imagen" },
    available: { type: "boolean", header: "Disponible" },
  };

  const actualizarComponente = () => {
    setActualizador(actualizador + 1);
  };

  const createItem = (data) => {
    const token = localStorage.getItem("access_token");
    axios
      .post(`${serverhost}api-rest/createProduct`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Producto creado con éxito:", response.data);
        actualizarComponente();
      })
      .catch((error) => {
        console.error("Error al crear el producto:", error.response.data.message);
      });
  };

  const updateItem = (id, data) => {
    const token = localStorage.getItem("access_token");
    data.forEach((valor, clave) => {
      console.log(`${clave}: ${valor}`);
    });
    axios
      .put(`${serverhost}products/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Producto actualizado con éxito:", response.data);
        actualizarComponente();
      })
      .catch((error) => {
        console.error("Error al actualizar el producto:", error.response.data.message);
      });
  };

  const deleteItem = (id) => {
    const token = localStorage.getItem("access_token");
    axios
      .delete(`${serverhost}products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Producto eliminado con éxito:", response.data);
        actualizarComponente();
      })
      .catch((error) => {
        console.error("Error al eliminar el producto:", error.response.data.message);
      });
  };

  const handleEdit = (id,product) => {
    console.log("Producto a editar:", id, product);
    setSelectedProduct(product); // Establece el producto seleccionado
    setOpenModal(true); // Abre el modal para editar
  };

  useEffect(() => {
      const token = localStorage.getItem("access_token");
      const {sub} = jwtDecode(token)
      const getData = async () => {
        try {
          const response = await axios.get(serverhost + `users/${sub}/userProfile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProductsData(response.data.products);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        // navigate("/");
      }
      try {
        const categoriesResponse = await axios.get(`${serverhost}categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDataCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
        return;
      }
    };

    getData();
  }, [navigate, actualizador]);

  return (
    <>
      {productsData && productsData.length > 0 && modelSchemaProducts ? (
        <>
          {(
            <ModalProductAddOrEditForBodega
              state={openModal}
              setState={setOpenModal}
              setSelectedProduct={setSelectedProduct} 
              createItem={createItem}
              updateItem={(data) => updateItem(selectedProduct._id, data)}
              dataUsers={dataUsers}
              dataCategories={dataCategories}
              product={selectedProduct}
              onClose={() => setOpenModal(false)}
            />
          )}
          <DynamicTable
            bodyData={productsData}
            model={modelSchemaProducts}
            deleteFunction={deleteItem}
            updateItemFunction={handleEdit} 
          />
        </>
      ) : (
        <>
        {(
          <ModalProductAddOrEditForBodega
            state={openModal}
            setState={setOpenModal}
            setSelectedProduct={setSelectedProduct} 
            createItem={createItem}
            updateItem={(data) => updateItem(selectedProduct._id, data)}
            dataUsers={dataUsers}
            dataCategories={dataCategories}
            product={selectedProduct}
            onClose={() => setOpenModal(false)}
          />
        )}
        <HeaderDynamicTable model={modelSchemaProducts} />
        </>
      )}
    </>
  );
};

export default ProductsBodega;
