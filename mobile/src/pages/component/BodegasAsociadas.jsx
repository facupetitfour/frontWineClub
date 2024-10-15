import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

// Array de bodegas con su imagen y nombre
const bodegas = [
  { nombre: 'Bodega Trivento', imagen: '/bodega.webp' },
  { nombre: 'Bodega Los Toneles', imagen: '/bodega.webp' },
  { nombre: 'Bodega Trivento', imagen: '/bodega.webp' },
  { nombre: 'Bodega Trivento', imagen: '/bodega.webp' },
  { nombre: 'Bodega Trivento', imagen: '/bodega.webp' },
  { nombre: 'Bodega Roberto B.', imagen: '/bodega.webp' },
];

const BodegasAsociadas = () => {
  return (
    <Box sx={{ padding: 2 }}>
      {/* Título */}
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Bodegas Asociadas
      </Typography>

      {/* Grid para mostrar las tarjetas */}
      <Grid container spacing={2}>
        {bodegas.map((bodega, index) => (
          <Grid item xs={6} key={index}>
            {/* Card de la bodega */}
            <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
              {/* Imagen */}
              <CardMedia
                component="img"
                height="140"
                image={bodega.imagen}
                alt={bodega.nombre}
              />
              {/* Nombre de la bodega */}
              <CardContent>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '14px' }}
                >
                  {bodega.nombre}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BodegasAsociadas;
