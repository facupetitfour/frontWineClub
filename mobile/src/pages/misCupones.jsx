import { useEffect, useState } from "react";
import CouponCard from "./component/CardCupon";
import { Box } from "@mui/material";
import axios from "axios";
const BACK_URL = import.meta.env.VITE_BACK_URL;
import { jwtDecode } from "jwt-decode";

const MisCupones = () => {
  // const data = [
  //   {
  //     name: "Cena para 2",
  //     description: "una maravillosa cena para 2 adultos ",
  //     points: "500",
  //     img: "/vinocarrusel.webp",
  //     stock: 150,
  //     bodega_id: "64a10e2b5e4a4e1a8f7c1234",
  //     available: true,
  //     approved: true,
  //     createdAt: "2024-11-11T10:00:00.000Z",
  //     updatedAt: "2024-11-11T10:00:00.000Z",
  //     opinions: [
  //       {
  //         name: "Facundo Petitfour",
  //         valorate: 5,
  //         opinion: "Este producto es excelente",
  //       },
  //       {
  //         name: "Pepe hongito",
  //         valorate: 2,
  //         opinion: "Este producto es excelente",
  //       },
  //       {
  //         name: "El Amargado",
  //         valorate: 1,
  //         opinion: "Este producto es excelente",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Tinto Reserva",
  //     description: "Vino tinto de reserva con notas de roble y frutos rojos",
  //     points: "500",
  //     img: "/vinocarrusel.webp",
  //     stock: 150,
  //     bodega_id: "64a10e2b5e4a4e1a8f7c1234",
  //     available: true,
  //     approved: true,
  //     createdAt: "2024-11-11T10:00:00.000Z",
  //     updatedAt: "2024-11-11T10:00:00.000Z",
  //     opinions: [
  //       {
  //         name: "Facundo Petitfour",
  //         valorate: 5,
  //         opinion: "Este producto es excelente",
  //       },
  //       {
  //         name: "Pepe hongito",
  //         valorate: 2,
  //         opinion: "Este producto es excelente",
  //       },
  //     ],
  //   },
  // ];
  const [perfil, setPerfil] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const { sub } = jwtDecode(token);
    const getData = async () => {
      if (BACK_URL) {
        try {
          await axios
            .get(`${BACK_URL}users/${sub}/userProfile`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              console.log(response.data);
              setPerfil(response.data);
            });
        } catch (error) {
          console.log(error.message);
        }
      } else {
        console.log(`NO HAY URL: ${BACK_URL}`);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 5, flexDirection: "column" }}>
          {perfil?.coupons?.map((data, index) => (
            <CouponCard
              key={index}
              img={data.img || "/vinocarrusel.webp"}
              name={data.name}
              description={data.description}
              points={data.points}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default MisCupones;
