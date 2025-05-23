import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DynamicTable from "../component/DynamicTable";
import HeaderDynamicTable from "../component/HeaderDynamicTable";
import axios from "axios";
import ModalProductAddOrEdit from "../component/modalsAdd/modalProductAddOrEdit";
import { Skeleton, Box, Stack } from "@mui/material";

const serverhost = import.meta.env.VITE_BACK_URL;

const Products = () => {
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([]);
  const [actualizador, setActualizador] = useState(0);
  const [dataUsers, setDataUsers] = useState(null);
  const [dataCategories, setDataCategories] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 🆕 Indicador de carga

  const modelSchemaProducts = {
    _id: { type: "string", header: "ID" },
    name: { type: "string", header: "Nombre" },
    description: { type: "string", header: "Descripcion" },
    points_required: { type: "boolean", header: "Costo puntos" },
    stock: { type: "date", header: "Fecha alta" },
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
      .post(`${serverhost}products`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Producto creado:", res.data);
        actualizarComponente();
      })
      .catch((err) => {
        console.error("Error al crear producto:", err.response.data.message);
      });
  };

  const updateItem = (id, data) => {
    const token = localStorage.getItem("access_token");
    axios
      .put(`${serverhost}products/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Producto actualizado:", res.data);
        actualizarComponente();
      })
      .catch((err) => {
        console.error("Error al actualizar producto:", err.response.data.message);
      });
  };

  const deleteItem = (id) => {
    const token = localStorage.getItem("access_token");
    axios
      .delete(`${serverhost}products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Producto eliminado:", res.data);
        actualizarComponente();
      })
      .catch((err) => {
        console.error("Error al eliminar producto:", err.response.data.message);
      });
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("access_token");
      setIsLoading(true); // 🆕 Iniciar loading

      try {
        const [productsRes, usersRes, categoriesRes] = await Promise.all([
          axios.get(`${serverhost}products`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${serverhost}users`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${serverhost}categories`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setProductsData(productsRes.data);
        setDataUsers(usersRes.data);
        setDataCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        navigate("/");
      } finally {
        setIsLoading(false); // 🆕 Finalizar loading
      }
    };

    getData();
  }, [navigate, actualizador]);

  return (
    <>
      {isLoading ? (
        // 🦴 Esqueleto de carga
        <Stack spacing={2} p={2}>
          <Skeleton variant="rectangular" height={40} width={200} />
          <Skeleton variant="rectangular" height={60} />
          <Skeleton variant="rectangular" height={60} />
          <Skeleton variant="rectangular" height={60} />
        </Stack>
      ) : productsData && productsData.length > 0 && modelSchemaProducts ? (
        <>
          {dataUsers && dataCategories && (
            <ModalProductAddOrEdit
              state={openModal}
              createItem={createItem}
              updateItem={(data) => updateItem(selectedProduct._id, data)}
              dataUsers={dataUsers}
              dataCategories={dataCategories}
              currentItem={selectedProduct}
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
        <HeaderDynamicTable model={modelSchemaProducts} />
      )}
    </>
  );
};

export default Products;
