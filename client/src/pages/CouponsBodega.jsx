import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DynamicTable from "../component/DynamicTable";
import HeaderDynamicTable from "../component/HeaderDynamicTable";
import axios from "axios";
import ModalCouponAddOrEdit from "../component/modals add/modalCouponAddOrEdit";
import { jwtDecode } from "jwt-decode";

const serverhost = "http://localhost:3000/";

const CouponsBodega = () => {
  const token = localStorage.getItem("access_token");

  const navigate = useNavigate();
  const [couponsData, setCouponsData] = useState([]);
  const [actualizador, setActualizador] = useState(0);
  const [dataUsers, setDataUsers] = useState(null);
  const [dataCategories, setDataCategories] = useState(null);
  const [selectedCoupon, setSelectedCoupon] = useState(null); // Para el producto seleccionado
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
    console.log(data);
    axios
      .post(serverhost + "coupon", data,{
        headers: {
        Authorization: `Bearer ${token}`,
      }})
      .then((response) => {
        console.log("Cupon creado con éxito: ", response.data);
        actualizarComponente();
      })
      .catch((error) => {
        console.error("Error al crear el cupon: ", error.response.data.message);
      });
  };
  const updateItem = (id,data) => {
    console.log(data)
    setSelectedCoupon(data)
    setOpenModal(true)
    console.log(openModal)
    // axios
    //   .put(serverhost + `coupons/${id}`, data,{
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((response) => {
    //     console.log("Cupon actualizado con éxito: ", response.data);
    //   })
    //   .catch((error) => {
    //     console.error(
    //       "Error al actualizar el cupon: ",
    //       error.response.data.message
    //     );
    //   });
  };
  const deleteItem = (id) => {
    axios
      .delete(serverhost + `coupons/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Cupon eliminado con éxito: ", response.data);
        actualizarComponente();
      })
      .catch((error) => {
        console.error(
          "Error al eliminar el cupon: ",
          error.response.data.message
        );
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const decodeToken = jwtDecode(token)
    console.log(decodeToken)
    const getData = async () => {
      try {
        const response = await axios.get(serverhost + `users/${decodeToken.sub}/userProfile`, {
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
    };
    getData();
  }, [navigate, actualizador]);
  
  return (
    <>
      {/* Botón flotante */}
      {couponsData && couponsData.length > 0 && modelSchemaCoupons ? ( //
        <>
          {dataUsers && dataCategories && (
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
          )}
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

export default CouponsBodega;
