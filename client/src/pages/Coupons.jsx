import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DynamicTable from "../component/DynamicTable";
import HeaderDynamicTable from "../component/HeaderDynamicTable";
import axios from "axios";
import ModalCouponAddOrEdit from "../component/modalsAdd/modalCouponAddOrEdit";
import { Skeleton, Stack } from "@mui/material";

const serverhost = import.meta.env.VITE_BACK_URL;

const Coupons = () => {
  const token = localStorage.getItem("access_token");

  const navigate = useNavigate();
  const [couponsData, setCouponsData] = useState([]);
  const [actualizador, setActualizador] = useState(0);
  const [dataUsers, setDataUsers] = useState(null);
  const [dataCategories, setDataCategories] = useState(null);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // NUEVO estado para controlar la carga
  const [loading, setLoading] = useState(true);

  const modelSchemaCoupons = {
    _id: { type: "string", header: "ID" },
    name: { type: "string", header: "Nombre" },
    description: { type: "string", header: "Descripcion" },
    points_required: { type: "number", header: "Costo puntos" },
    stock: { type: "number", header: " Stock" },
    createdAt: { type: "date", header: "Fecha Creacion" },
    img: { type: "img", header: "imagen" },
    avaiable: { type: "boolean", header: "disponible" },
    expiration_date: { type: "date", header: "Fecha expiracion" },
  };

  const actualizarComponente = () => {
    setActualizador(actualizador + 1);
  };

  const createItem = (data) => {
    console.log(data);
    axios
      .post(serverhost + "coupon", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Cupon creado con éxito: ", response.data);
        actualizarComponente();
      })
      .catch((error) => {
        console.error("Error al crear el cupon: ", error.response.data.message);
      });
  };

  const updateItem = (id, data) => {
    console.log(data);
    setSelectedCoupon(data);
    setOpenModal(true);
    console.log(openModal);
  };

  const deleteItem = (id) => {
    axios
      .delete(serverhost + `coupons/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Cupon eliminado con éxito: ", response.data);
        actualizarComponente();
      })
      .catch((error) => {
        console.error("Error al eliminar el cupon: ", error.response.data.message);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(serverhost + "coupon", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCouponsData(response.data);
      } catch (error) {
        console.error("Error al obtener data de usuarios", error);
      }
      try {
        const usersResponse = await axios.get(`${serverhost}users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDataUsers(usersResponse.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
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
      }
      setLoading(false);
    };
    getData();
  }, [navigate, actualizador]);

  return (
    <>
      {loading ? (
        // Skeleton mientras carga
        <Stack spacing={2} p={2}>
          <Skeleton variant="rectangular" height={40} width={200} />
          <Skeleton variant="rectangular" height={60} />
          <Skeleton variant="rectangular" height={60} />
          <Skeleton variant="rectangular" height={60} />
        </Stack>
      ) : couponsData && couponsData.length > 0 && dataUsers && dataCategories ? (
        <>
          <ModalCouponAddOrEdit
            state={openModal}
            setState={setOpenModal}
            createItem={createItem}
            updateItem={(couponsData) => updateItem(selectedCoupon._id, couponsData)}
            dataUsers={dataUsers}
            dataCategories={dataCategories}
            currentItem={selectedCoupon}
            onClose={() => setOpenModal(false)}
          />
          <DynamicTable
            bodyData={couponsData}
            model={modelSchemaCoupons}
            deleteFunction={deleteItem}
            updateItemFunction={updateItem}
          />
        </>
      ) : (
        <HeaderDynamicTable model={modelSchemaCoupons} />
      )}
    </>
  );
};

export default Coupons;
