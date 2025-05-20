"use client"

import { Box, Typography } from "@mui/material"
import { useState, useEffect, useRef } from "react"

const Carousel = ({ imagenesBodega, nombreBodega }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const autoPlayRef = useRef(null)

  // Usar imágenes proporcionadas o imágenes de respaldo
  const items = imagenesBodega?.length > 0
    ? imagenesBodega.map((img) => ({ img }))
    : [
        { img: {url:`/vinocarrusel.webp`}},
        { img: {url:`/vinocarrusel.webp`}},
        { img: {url:`/vinocarrusel.webp`}},
      ]

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  // Efecto para autoplay
  useEffect(() => {
    if (isAutoPlaying && !isHovering) {
      autoPlayRef.current = setInterval(() => {
        handleNext()
      }, 5000) // Cambiar cada 5 segundos
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, isHovering])

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: 300,
        overflow: "hidden",
        padding: 1,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Renderiza el elemento actual del carrusel */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          padding: 0,
          height: 270,
          backgroundImage: `url(${items[currentIndex].img.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "15px",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Texto ajustado */}
        <Typography
          variant="h6"
          sx={{
            color: "#ffffff",
            left: 0,
            bottom: 0,
            background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.01))",
            padding: "10px 15px",
            borderRadius: "0px 0px 15px 15px",
            width: "100%",
            textAlign: "left",
            textShadow: "0 1px 2px rgba(0,0,0,0.5)",
            transition: "transform 0.3s ease",
            animation: "slideUp 0.5s ease-out",
          }}
        >
          {nombreBodega}
        </Typography>
      </Box>

      {/* Botones de navegación mejorados pero manteniendo el estilo original */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          cursor: "pointer",
          color: "white",
          fontSize: "20px",
          width: "30px",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          transition: "all 0.2s ease",
          zIndex: 2,
        }}
        onClick={handlePrev}
      >
        &#10094;
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          cursor: "pointer",
          color: "white",
          fontSize: "20px",
          width: "30px",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          // transition: "all 0.2s ease",
          zIndex: 2,
        }}
        onClick={handleNext}
      >
        &#10095;
      </Box>

      {/* Indicadores de diapositivas (sutiles) */}
      <Box
        sx={{
          position: "absolute",
          bottom: "35px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "6px",
          zIndex: 2,
        }}
      >
        {items.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: index === currentIndex ? "white" : "rgba(255, 255, 255, 0.5)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          />
        ))}
      </Box>

      {/* Botón de pausa/reproducción (sutil) */}
      
    </Box>
  )
}

export default Carousel
