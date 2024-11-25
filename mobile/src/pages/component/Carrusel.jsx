import { Box, Typography } from '@mui/material';
import { useState } from 'react';

const Carousel = ({ imagenesBodega, nombreBodega }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: 300, overflow: 'hidden', padding: 1 }}>
      {/* Renderiza el elemento actual del carrusel */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          padding: 0,
          height: 270,
          backgroundImage: `url(${imagenesBodega ? imagenesBodega[currentIndex] : items[currentIndex].img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '15px',
          transition: 'background-image 0.5s ease-in-out',
        }}
      >
        {/* Texto ajustado */}
        <Typography
          variant="h6"
          sx={{
            color: '#ffffff',
            left: 0,
            bottom: 0,
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.01))',
            padding: '10px 15px',
            borderRadius: '0px 0px 15px 15px',
            width: '100%',
            textAlign: 'left',
          }}
        >
          {nombreBodega}
        </Typography>
      </Box>

      {/* Botones de navegación */}
      <Box sx={{ position: 'absolute', top: '50%', left: '10px', cursor: 'pointer', color: 'white'}} onClick={handlePrev}>
        &#10094;
      </Box>
      <Box sx={{ position: 'absolute', top: '50%', right: '10px', cursor: 'pointer', color: 'white' }} onClick={handleNext}>
        &#10095;
      </Box>
    </Box>
  );
};

export default Carousel;
