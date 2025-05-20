import { useEffect, useState } from "react";
import CouponCard from "./component/CardCupon";
import { Box, Divider, Grid, Tab, Tabs } from "@mui/material";
import axios from "axios";
const BACK_URL = import.meta.env.VITE_BACK_URL;
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const MisCupones = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [tab, setTab] = useState(1);

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
              setProfile(response.data.profile);
            });
        } catch (error) {
          // console.log(error.message);
        }
      } else {
        // console.log(`NO HAY URL: ${BACK_URL}`);
      }
    };
    getData();
  }, []);

  return (
    <Box sx={{ minWidth: "100%" }}>
      <Box sx={{ justifyContent: "center", alignItems: "center", padding: 2 }}>
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="Cupones" value={1} />
          <Tab label="Productos" value={2} />
        </Tabs>
        <Divider
          sx={{ borderColor: "#ff", borderWidth: 1, marginBottom: "10px" }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: "100%",
            gap: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {tab === 1 &&
            (profile?.points_history?.some((data) => data.type === "coupon") ? (
              profile.points_history?.map(
                (data, index) =>
                  data.type === "coupon" && (
                    <Grid
                      key={index}
                      sx={{minWidth: "100%" }}
                      onClick={() =>
                        navigate(`/claimrender`, { state: { data: data, profile: profile } })
                      }
                    >
                      <CouponCard
                        img={data?.img?.url ? data.img.url : "/vinocarrusel.webp"}
                        name={data.name}
                        description={data.description}
                        points={data.points}
                      />
                    </Grid>
                  )
              )
            ) : (
              <Box
                sx={{ textAlign: "center", color: "gray", fontSize: "1.2rem" }}
              >
                No hay cupones disponibles.
              </Box>
            ))}

          {tab === 2 &&
            (profile?.points_history?.some((data) => data.type === "product") ? (
              profile.points_history?.map(
                (data, index) =>
                  data.type === "product" && (
                    <Grid
                      key={index}
                      sx={{ minWidth: "100%" }}
                      onClick={() =>
                        navigate(`/claimrender`, { state: { data: data, profile: profile } })
                      }
                    >
                      <CouponCard
                        img={data?.img?.url ? data.img.url : "/vinocarrusel.webp"}
                        name={data.name}
                        description={data.description}
                        points={data.points}
                      />
                    </Grid>
                  )
              )
            ) : (
              <Box
                sx={{ textAlign: "center", color: "gray", fontSize: "1.2rem" }}
              >
                No hay productos disponibles.
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MisCupones;
