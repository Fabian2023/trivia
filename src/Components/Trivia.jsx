import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import intro from "../images/Intro 3.mp4";
import fondo from "../images/fondo.png";

const Trivia = () => {
  const navigate = useNavigate(); // Hook para redirigir
  const [isVideoReady, setIsVideoReady] = useState(false); // Estado para controlar cuándo el video está listo

  const handleClick = () => {
    navigate('/registro'); // Redirige a /registro al hacer clic
  };

  // Maneja cuando el video está listo para reproducirse
  const handleVideoLoad = () => {
    setIsVideoReady(true); // Cambia el estado cuando el video esté listo
  };

  return (
    <div className="relative w-full h-screen">
      {/* Imagen de fondo fija mientras se carga el video */}
      {!isVideoReady && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 flex justify-center items-center">
          <img
            src={fondo}
            alt="Fondo de carga"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Video */}
      <div
        className="relative w-full h-full overflow-hidden"
        onClick={handleClick}
      >
        <video
          src={intro}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          onCanPlay={handleVideoLoad} // Evento que indica cuando el video está listo
        />
      </div>
    </div>
  );
};

export default Trivia;
