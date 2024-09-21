import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fondopre from "../images/JUEGO _ SELECCIÓN RTA.png";
import respuesta from "../images/JUEGO _ RTA CORRECTA.png";
import cierre from "../images/Cierre 3.mp4";

const Preguntas = () => {
  const [isRespuesta, setIsRespuesta] = useState(false);
  const [mostrarVideo, setMostrarVideo] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsRespuesta(true);
    setTimeout(() => {
      setIsRespuesta(false);
      setMostrarVideo(true);
    }, 4000); // Muestra la respuesta durante 4 segundos
  };

  useEffect(() => {
    if (mostrarVideo) {
      const timer = setTimeout(() => {
        navigate('/'); // Redirige después de 3 segundos
      }, 4000); // Espera 3 segundos antes de redirigir

      return () => clearTimeout(timer); // Limpia el timer al desmontar
    }
  }, [mostrarVideo, navigate]);

  return (
    <div className="relative w-full h-screen">
      {!mostrarVideo ? (
        <img
          src={isRespuesta ? respuesta : fondopre} 
          alt="Fondo"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      ) : (
        <video
          src={cierre}
          autoPlay
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}

      <div
        className="absolute top-[1000px] left-32 w-[820px] h-[650px] opacity-50 flex justify-center items-center cursor-pointer"
        onClick={handleClick} 
      >
        {/* Puedes agregar contenido dentro del div si es necesario */}
      </div>
    </div>
  );
};

export default Preguntas;
