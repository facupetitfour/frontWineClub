# WineClub

WineClub es una aplicación diseñada para fortalecer la relación entre las bodegas mendocinas y sus clientes a través de un sistema de fidelización innovador. La aplicación permite a los usuarios acumular puntos y canjearlos por experiencias exclusivas en bodegas, promoviendo el turismo enológico en la región vitivinícola de Mendoza.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)

## Características

- **Fidelización de clientes**: Las bodegas pueden otorgar puntos por la compra de productos y servicios.
- **Canje de puntos**: Los usuarios pueden canjear puntos por experiencias como catas y visitas a otras bodegas.
- **Turismo enológico**: Promueve la exploración de bodegas y experiencias únicas en la región de Mendoza.
- **Plataforma intuitiva**: Fácil gestión de puntos y experiencias desde la aplicación.

## Tecnologías Utilizadas

- **Frontend**: Vite, React.js
- **Base de datos**: MongoDB
- **Despliegue**: En local para desarrollo

## Variables de entorno:
### Server BackEnd .env:
- **MONGO_URI**= "mongodb://127.0.0.1:27017/WineClub"
- **secretKey**= "escribir una clave"

## Inicializar proyecto

- cd nombre carpeta
- npm install (ya sea en la carpeta cliente o mobile ambas contienen distintos front)
- crear archivo .env y configurar en raiz del proyecto
- npm run dev