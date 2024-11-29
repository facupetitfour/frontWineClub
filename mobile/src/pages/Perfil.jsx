import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Divider, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import PercentIcon from '@mui/icons-material/Percent'; // Icono %
import WineBarIcon from '@mui/icons-material/WineBar'; // Icono de botella de vino
import CelebrationIcon from '@mui/icons-material/Celebration'; // Icono de copas brindando

const Perfil = () => {
  const coupons = [
    { name: 'Nombre del Producto/ Cupón', redeemedDate: '13/13/1333', points: 150000 },
    { name: 'Nombre del Producto/ Cupón', redeemedDate: '13/13/1333', points: 10000 },
    { name: 'Nombre del Producto/ Cupón', redeemedDate: '13/13/1333', points: 1500 },
    { name: 'Nombre del Producto/ Cupón', redeemedDate: '13/13/1333', points: 1500 },
  ];

  // useEffect(() => {
  //   const token = localStorage.getItem("access_token");
  //   const [data,setData] = useState({});

  //   const getData = async () => {
  //     if (BACK_URL) {
  //       try {
  //         await axios.get(`${BACK_URL}users/${id}/userProfile`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }).then((response)=>{
  //           setData(response.data)
  //           console.log(data)
  //         });
  //       } catch (error) {
  //         console.log(error.message)
  //       }
  //     }else{
  //       console.log(`NO HAY URL: ${BACK_URL}`)
  //     }
      
  //   };
  //   getData()
  // },[]);

  return (
    <Box sx={{ padding:2 , minHeight: '100vh', minWidth:'100%'}}>
      {/* Tarjeta superior */}
      <Card sx={{ marginBottom: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <WineBarIcon sx={{ fontSize: 40, color: '#db2c6f', marginRight: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Hola!
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            Facundo Petitfour
          </Typography>
          <Divider sx={{ borderColor: '#db2c6f', borderWidth: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
            <CelebrationIcon sx={{ fontSize: 40, color: '#db2c6f' }} />
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#000' }}>
              1,000,000
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Lista de cupones */}
      <Box sx={{ backgroundColor: '#fff', borderRadius: 3, boxShadow: 2, padding: 2 }}>
        <List disablePadding>
          {coupons.map((coupon, index) => (
            <ListItem
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: index !== coupons.length - 1 ? '1px dashed #db2c6f' : 'none',
                padding: '12px 0',
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: '#db2c6f', width: 40, height: 40 }}>
                  <PercentIcon sx={{ color: '#fff' }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: 14 }}>
                    {coupon.name}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" sx={{ color: '#888', fontSize: 12 }}>
                    Canjeado el: {coupon.redeemedDate}
                  </Typography>
                }
                sx={{ marginRight: 2 }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: '#000',
                  whiteSpace: 'nowrap',
                }}
              >
                {coupon.points.toLocaleString('en-US')}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Perfil;
