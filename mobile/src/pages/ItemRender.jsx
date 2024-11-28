import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useLocation } from "react-router-dom";
import Carousel from "./component/Carrusel";

const ItemRender = () => {
  const location = useLocation();
  const item = location.state?.data || {
    name: "Vino Tinto Reserva",
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
      {
        name: "El Amargado",
        valorate: 1,
        opinion: "Este producto es excelente",
      },
    ],
  };

  console.log(item)

  return (
    <>
      {item ? (
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
            <Card
              sx={{
                minWidth: "100%",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              {/* Image Section */}
              <CardMedia
                // component="img"
                height="200"
                // image={item.img || '/imagenBaseItems.webp'} 
                // alt={item.name}
              >
                <Carousel imagenesBodega={item.img}/>
              </CardMedia>

              {/* Title, Description and Points Section */}
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" component="div" noWrap>
                    {item.name}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <LocalMallIcon sx={{ mr: 0.5 }} />
                    <Typography variant="h6" component="div">
                      {item.points_required}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                minWidth: "100%",
                borderRadius: 2,
                boxShadow: 3,
                margin: "auto",
                paddingBottom: 0.5,

              }}
            >
              {/* Reviews Section */}
              {item.opinions?.map((opinion, index) => (
                <CardContent
                  key={index}
                  sx={{
                    borderBottom: "1px dashed transparent",
                    borderImage:
                      "repeating-linear-gradient(to right, #D90036, #D90036 5px, transparent 5px, transparent 10px) 100",
                    width: "100%",
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.primary"
                      fontWeight="bold"
                    >
                      {opinion.name}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      {[...Array(opinion.valorate)].map((_, index) => (
                        <StarIcon
                          key={index}
                          fontSize="small"
                          sx={{ color: "#FFD700" }}
                        />
                      ))}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {opinion.opinion}
                    </Typography>
                  </Box>
                </CardContent>
              ))}
            </Card>
          </Box>
        </Box>
      ) : (
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
            <Card sx={{ minWidth: "100%", borderRadius: 2, boxShadow: 3 }}>
              {/* Image Section */}
              <CardMedia
                component="img"
                height="200"
                image="/vinocarrusel.webp"
                alt="Wine bottle and glass"
              />

              {/* Title, Description and Price Section */}
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" component="div" noWrap>
                    Botella tinto + Copa de vino
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <LocalMallIcon sx={{ mr: 0.5 }} />
                    <Typography variant="h6" component="div">
                      1500
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary">
                  Una botella del vino a eleccion con una copa especial de
                  nuestra bodega. *esto es agregado para ver que tan largo tiene
                  que ser el texto y dar un ejemplo
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                minWidth: "100%",
                borderRadius: 2,
                boxShadow: 3,
                paddingBottom: 0.5,
              }}
            >
              {/* Reviews Section */}
              <CardContent
                sx={{
                  borderBottom: "1px dashed transparent",
                  borderImage:
                    "repeating-linear-gradient(to right, #D90036, #D90036 5px, transparent 5px, transparent 10px) 100",
                  width: "100%",
                }}
              >
                <Box>
                  <Typography
                    variant="subtitle2"
                    color="text.primary"
                    fontWeight="bold"
                  >
                    Pepe hongito
                  </Typography>
                  <Box display="flex" alignItems="center">
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        key={index}
                        fontSize="small"
                        sx={{ color: "#FFD700" }}
                      />
                    ))}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    El producto es excelente buen sabor y la copa muy linda.
                  </Typography>
                </Box>
              </CardContent>
              <CardContent
                sx={{
                  borderBottom: "1px dashed transparent",
                  borderImage:
                    "repeating-linear-gradient(to right, #D90036, #D90036 5px, transparent 5px, transparent 10px) 100",
                  width: "100%",
                }}
              >
                <Box>
                  <Typography
                    variant="subtitle2"
                    color="text.primary"
                    fontWeight="bold"
                  >
                    Otro generico
                  </Typography>
                  <Box display="flex" alignItems="center">
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        key={index}
                        fontSize="small"
                        sx={{ color: "#FFD700" }}
                      />
                    ))}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Otro comentario excelente sobre el producto.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ItemRender;
