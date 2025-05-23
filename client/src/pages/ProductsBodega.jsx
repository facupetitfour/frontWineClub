import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DynamicTable from "../component/DynamicTable";
import HeaderDynamicTable from "../component/HeaderDynamicTable";
import axios from "axios";
import ModalProductAddOrEditForBodega from "../component/modalsAdd/modalProductAddOrEditForBodega";
import { jwtDecode } from "jwt-decode";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const serverhost = import.meta.env.VITE_BACK_URL;

const ProductsBodega = () => {
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([]);
  const [actualizador, setActualizador] = useState(0);
  const [dataUsers, setDataUsers] = useState(null);
  const [dataCategories, setDataCategories] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // ⚠️ Bandera de carga

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
        actualizarComponente();
      })
      .catch((error) => {
        console.error("Error al crear el producto:", error.response.data.message);
      });
  };

  const updateItem = (id, data) => {
    const token = localStorage.getItem("access_token");
    axios
      .put(`${serverhost}products/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
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
        actualizarComponente();
      })
      .catch((error) => {
        console.error("Error al eliminar el producto:", error.response.data.message);
      });
  };

  const handleEdit = (id, product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const { sub } = jwtDecode(token);

    const getData = async () => {
      try {
        setIsLoading(true); // 🟣 Empieza la carga
        const [userRes, categoriesRes] = await Promise.all([
          axios.get(`${serverhost}users/${sub}/userProfile`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${serverhost}categories`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setProductsData(userRes.data.products);
        setDataCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setIsLoading(false); // 🟢 Finaliza la carga
      }
    };

    getData();
  }, [navigate, actualizador]);

  return (
    <>
      <ModalProductAddOrEditForBodega
        state={openModal}
        setState={setOpenModal}
        setSelectedProduct={setSelectedProduct}
        createItem={createItem}
        updateItem={(data) => updateItem(selectedProduct?._id, data)}
        dataUsers={dataUsers}
        dataCategories={dataCategories}
        product={selectedProduct}
        onClose={() => setOpenModal(false)}
      />

      {isLoading ? (
        <Box sx={{ px: 2, py: 4 }}>
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
          <Skeleton height={50} />
        </Box>
      ) : (
        <DynamicTable
          bodyData={productsData}
          model={modelSchemaProducts}
          deleteFunction={deleteItem}
          updateItemFunction={handleEdit}
        />
      )}
    </>
  );
};

export default ProductsBodega;
