import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DynamicTable from "../component/DynamicTable";
import HeaderDynamicTable from "../component/HeaderDynamicTable";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ModalCouponAddOrEditForBodega from "../component/modalsAdd/modalCouponAddOrEditForBodega";
import { Skeleton, Stack } from "@mui/material";

const serverhost = import.meta.env.VITE_BACK_URL;

const CouponsBodega = () => {
  const navigate = useNavigate();
  const [couponsData, setCouponsData] = useState([]);
  const [actualizador, setActualizador] = useState(0);
  const [dataCategories, setDataCategories] = useState(null);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true); // NUEVO estado para skeleton

  const modelSchemaCoupons = {
    _id: { type: "string", header: "ID" },
    name: { type: "string", header: "Nombre" },
    description: { type: "string", header: "Descripcion" },
    points_required: { type: "boolean", header: "Costo puntos" },
    stock: { type: "date", header: "Fecha alta" },
    createdAt: { type: "date", header: "Fecha Creación" },
    img: { type: "img", header: "Imagen" },
    available: { type: "boolean", header: "Disponible" },
    expiration_date: { type: "date", header: "Fecha expiración" },
  };

  const actualizarComponente = () => setActualizador((prev) => prev + 1);

  const createItem = (data) => {
    const token = localStorage.getItem("access_token");
    axios
      .post(`${serverhost}api-rest/createCoupon`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => actualizarComponente())
      .catch((error) =>
        console.error("Error al crear el cupón:", error.response?.data?.message)
      );
  };

  const updateItem = (id, data) => {
    const token = localStorage.getItem("access_token");
    axios
      .put(`${serverhost}coupon/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => actualizarComponente())
      .catch((error) =>
        console.error("Error al actualizar el cupón:", error.response?.data?.message)
      );
  };

  const deleteItem = (id) => {
    const token = localStorage.getItem("access_token");
    axios
      .delete(`${serverhost}coupon/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => actualizarComponente())
      .catch((error) =>
        console.error("Error al eliminar el cupón:", error.response?.data?.message)
      );
  };

  const handleEdit = (id, coupon) => {
    setSelectedCoupon(coupon);
    setOpenModal(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return navigate("/");

    let sub;
    try {
      ({ sub } = jwtDecode(token));
    } catch (err) {
      console.error("Token inválido", err);
      navigate("/");
      return;
    }

    const getData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${serverhost}users/${sub}/userProfile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCouponsData(data.coupons);
      } catch (error) {
        console.error("Error al obtener los cupones:", error);
      }

      try {
        const { data } = await axios.get(`${serverhost}categories`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDataCategories(data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [navigate, actualizador]);

  return (
    <>
      <ModalCouponAddOrEditForBodega
        state={openModal}
        setState={setOpenModal}
        setSelectedCoupon={setSelectedCoupon}
        createItem={createItem}
        updateItem={(data) => updateItem(selectedCoupon?._id, data)}
        dataCategories={dataCategories}
        coupon={selectedCoupon}
        onClose={() => setOpenModal(false)}
      />

      {loading ? (
        // Skeleton cuando está cargando
        <Stack spacing={2} p={2}>
          <Skeleton variant="rectangular" height={40} width={200} />
          <Skeleton variant="rectangular" height={60} />
          <Skeleton variant="rectangular" height={60} />
          <Skeleton variant="rectangular" height={60} />
        </Stack>
      ):(
        <DynamicTable
          bodyData={couponsData}
          model={modelSchemaCoupons}
          deleteFunction={deleteItem}
          updateItemFunction={handleEdit}
        />
      )}
    </>
  );
};

export default CouponsBodega;
