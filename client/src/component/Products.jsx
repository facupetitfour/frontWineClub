import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DynamicTable from './DynamicTable'
import HeaderDynamicTable from './HeaderDynamicTable'
import axios from "axios";
const serverhost = "http://localhost:3000/";

const Products = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const modelSchemaProducts = {
    ID_USUARIO: {type: "string", header: "ID"},
    nombre: {type: "string", header: "Nombre"},
    mail: {type: "string", header: "Mail"},
    subscripto: {type: "boolean", header: "Subscripto"},
    vencimientoSubscripcion: {type: "date", header:" Vencimiento subscripcion"},
    fechaAlta: {type: "date", header:"Fecha de creacion"}
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(serverhost + "products", {
          withCredentials: true,
        });
        console.log(response.data)
        setData(response.data);
      } catch (error) {
        console.error("Error al obtener data de usuarios", error);
        navigate("/login");
      }
    };
    getData();
  }, [navigate]);
  return (
    <>
      <HeaderDynamicTable model={modelSchemaProducts}/>

      {/* <DynamicTable/> */}



      {/* {data ? (
      <Container sx={{display:"flex"}}>
        <Grid container spacing={4}>
          {data.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: 140 }}
                  image={product.img}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography>{product.description}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    ${product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    ) : null} */}
    </>
    
  )
}

export default Products