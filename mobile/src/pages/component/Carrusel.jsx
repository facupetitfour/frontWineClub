import React from 'react';
import { Box, Hidden, Typography } from '@mui/material';
import { useState } from 'react';

// Si no tienes un componente Carousel ya configurado, puedes usar este con lógica básica
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Imágenes y texto opcionales
  const items = [
    {
      img: `/vinocarrusel.webp`,
      text: 'Item 1 text',
    },
    {
      img: '/vinocarrusel.webp',
      text: 'Item 2 text',
    },
    {
      img: '/vinocarrusel.webp',
      text: 'Item 3 text',
    },
  ];

  // Cambia el índice para el carrusel
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', padding:1}}>
      {/* Renderiza el elemento actual del carrusel */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          padding: 0,
          height: 270,
          backgroundImage: `url(${items[currentIndex].img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '15px',
          transition: 'background-image 0.5s ease-in-out',
        }}
      >
        {/* Texto opcional */}
        <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            // visibility: items[currentIndex].text ? 'visible' : 'hidden',
            visibility: "hidden",
            color: '#ffff',
            left: '10px',
            bottom: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '4px 8px',
            borderRadius: '8px',
          }}
        >
          {items[currentIndex].text}
        </Typography>
      </Box>

      {/* Botones de navegación */}
      <Box sx={{ position: 'absolute', top: '50%', left: '10px', cursor: 'pointer' }} onClick={handlePrev}>
        &#10094;
      </Box>
      <Box sx={{ position: 'absolute', top: '50%', right: '10px', cursor: 'pointer' }} onClick={handleNext}>
        &#10095;
      </Box>
    </Box>
  );
};

export default Carousel;
