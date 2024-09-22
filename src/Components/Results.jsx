import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import fondoresult from "../images/FINAL.png";
import fondofijo from "../images/CTA.png";
import { checkInServiceJs } from "../firebase/firebaseServiceJs";
import cierre from "../images/Cierre 3.mp4";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score } = location.state || { score: 0 }; // Obtener el puntaje del estado
  const userCode = localStorage.getItem("userCode") || "";
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100); // Simula el montaje completo del componente

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const scoreTimer = setTimeout(() => {
      setShowVideo(true);
    }, 4000); // Mostrar el puntaje por 4 segundos

    return () => clearTimeout(scoreTimer);
  }, []);

  useEffect(() => {
    saveData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Guardar datos al montar

  
  const handleVideoEnd = () => {
    navigate("/"); 
  };

  const saveData = async () => {
    const previewParticipation = await checkInServiceJs.getUserParticipation({ userCode });
    if (previewParticipation.participationDateList.length === 1) {
      checkInServiceJs.saveUserParticipation({
        userCode,
        points: Math.min(previewParticipation.points + score, 100),
      });
    }
  };

  useEffect(() => {
    if (showVideo) {
      const videoTimer = setTimeout(() => {
        navigate('/'); // Redirigir al usuario a la ruta /
      }, 5000); // Duración del video

      return () => clearTimeout(videoTimer);
    }
  }, [showVideo, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      {loading ? (
        <img
          src={fondofijo}
          alt="Cargando"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <>
          <img
            src={fondoresult}
            alt="Fondo"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {showVideo ? (
            <video
            src={cierre}
            className="relative z-10 w-full h-full object-cover"
            autoPlay
            muted 
            onEnded={handleVideoEnd}
          />            
          ) : (
            <p className="relative text-5xl text-white bg-[#FAC224] rounded-xl w-[80%] max-w-lg h-24 flex justify-center items-center font-semibold text-center">
              Puntaje: {score} pts
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Results;
