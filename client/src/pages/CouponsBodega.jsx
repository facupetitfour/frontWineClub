import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DynamicTable from "../component/DynamicTable";
import HeaderDynamicTable from "../component/HeaderDynamicTable";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ModalCouponAddOrEditForBodega from "../component/modals add/modalCouponAddOrEditForBodega";

const serverhost = import.meta.env.VITE_BACK_URL;

const CouponsBodega = () => {
  const token = localStorage.getItem("access_token");

  const navigate = useNavigate();
  const [couponsData, setCouponsData] = useState([]);
  const [actualizador, setActualizador] = useState(0);
  const [dataUsers, setDataUsers] = useState(null);
  const [dataCategories, setDataCategories] = useState(null);
  const [selectedCoupon, setSelectedCoupon] = useState(null); // Para el cupon seleccionado
  const [openModal, setOpenModal] = useState(false); // Para el control del modal

  const modelSchemaCoupons = {
    _id: { type: "string", header: "ID" },
    name: { type: "string", header: "Nombre" },
    description: { type: "string", header: "Descripcion" },
    points_required: { type: "boolean", header: "Costo puntos" },
    stock: { type: "date", header: " Fecha alta" },
    createdAt: { type: "date", header: "Fecha Creacion" },
    img: { type: "img", header: "imagen" },
    avaiable: { type: "boolean", header: "disponible" },
    expiration_date: { type: "date", header: "Fecha expiracion" },
  };

  const actualizarComponente = () => {
    setActualizador(actualizador + 1);
  };

  const createItem = (data) => {
    const token = localStorage.getItem("access_token");
    axios
      .post(`${serverhost}api-rest/createCoupon`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Cupon creado con éxito:", response.data);
        actualizarComponente();
      })
      .catch((error) => {
        console.error("Error al crear el cupon:", error.response.data.message);
      });
  };
  const updateItem = (id, data) => {
    const token = localStorage.getItem("access_token");
    axios
      .put(`${serverhost}coupon/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Cupon actualizado con éxito:", response.data);
        actualizarComponente();
      })
      .catch((error) => {
        console.error("Error al actualizar el cupon:", error.response.data.message);
      });
  };

  const deleteItem = (id) => {
    const token = localStorage.getItem("access_token");
    axios
      .delete(`${serverhost}coupon/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Cupon eliminado con éxito:", response.data);
        actualizarComponente();
      })
      .catch((error) => {
        console.error("Error al eliminar el cupon:", error.response.data.message);
      });
  };

  const handleEdit = (id,coupon) => {
    console.log("Cupon a editar:", id, coupon);
    setSelectedCoupon(coupon); // Establece el cupon seleccionado
    console.log("Cupon seleccionado:", selectedCoupon);
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
        console.log(response.data.coupons);
        setCouponsData(response.data.coupons);
      } catch (error) {
        console.error("Error al obtener data", error);
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
      {/* Botón flotante */}
      {couponsData && couponsData.length > 0 && modelSchemaCoupons ? ( //
        <>
          {(
            <ModalCouponAddOrEditForBodega
              state={openModal}
              setState={setOpenModal}
              setSelectedCoupon={setSelectedCoupon} 
              createItem={createItem}
              updateItem={(data) => updateItem(selectedCoupon._id, data)}
              dataUsers={dataUsers}
              dataCategories={dataCategories}
              coupon={selectedCoupon}
              onClose={() => setOpenModal(false)}
            />
          )}
          <DynamicTable
            bodyData={couponsData}
            model={modelSchemaCoupons}
            deleteFunction={deleteItem}
            updateItemFunction={handleEdit}
          />
        </>
      ) : (
        <HeaderDynamicTable model={modelSchemaCoupons} />
      )}
    </>
  );
};

export default CouponsBodega;
