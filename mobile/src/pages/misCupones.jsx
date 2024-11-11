import CouponCard from "./component/CardCupon";
import { Box } from "@mui/material";

// import { useEffect } from "react";
// import axios from "axios";

// const BACK_URL = import.meta.env.VITE_BACK_URL;

const MisCupones = () => {
  const data = [
    {
      name: "Cena para 2",
      description: "una maravillosa cena para 2 adultos ",
      points: "500",
      img: "/vinocarrusel.webp",
      stock: 150,
      bodega_id: "64a10e2b5e4a4e1a8f7c1234",
      available: true,
      approved: true,
      createdAt: "2024-11-11T10:00:00.000Z",
      updatedAt: "2024-11-11T10:00:00.000Z",
      opinions: [
        {
          name: "Facundo Petitfour",
          valorate: 5,
          opinion: "Este producto es excelente",
        },
        {
          name: "Pepe hongito",
          valorate: 2,
          opinion: "Este producto es excelente",
        },
        {
          name: "El Amargado",
          valorate: 1,
          opinion: "Este producto es excelente",
        },
      ],
    },
    {
      name: "Tinto Reserva",
      description: "Vino tinto de reserva con notas de roble y frutos rojos",
      points: "500",
      img: "/vinocarrusel.webp",
      stock: 150,
      bodega_id: "64a10e2b5e4a4e1a8f7c1234",
      available: true,
      approved: true,
      createdAt: "2024-11-11T10:00:00.000Z",
      updatedAt: "2024-11-11T10:00:00.000Z",
      opinions: [
        {
          name: "Facundo Petitfour",
          valorate: 5,
          opinion: "Este producto es excelente",
        },
        {
          name: "Pepe hongito",
          valorate: 2,
          opinion: "Este producto es excelente",
        },
      ],
    },
  ];

  console.log(data);

  // useEffect(() => {
  //   const getData = async () => {
  //     if (BACK_URL) {
  //       try {
  //         await axios.get(`${BACK_URL}`).then((response) => {
  //           console.log(response.data);
  //         });
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     } else {
  //       console.log(`NO HAY URL: ${BACK_URL}`);
  //     }
  //   };
  //   getData();
  // }, []);

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 5, flexDirection: "column" }}>
          {data
            ? data.map((data, index) => {
                return (
                  <>
                    <CouponCard
                      key={index}
                      img={data.img}
                      name={data.name}
                      description={data.description}
                      points={data.points}
                    />
                  </>
                );
              })
            : null}
        </Box>
      </Box>
    </>
  );
};

export default MisCupones;
