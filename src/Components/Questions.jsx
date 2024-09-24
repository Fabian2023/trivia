import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import fondopreg from "../images/JUEGO _ SELECCIÓN RTA .png";
import KanitFont from "../fonts/Kanit-Regular.ttf";
import preguntasData from '../preguntas.json';
import a from "../images/A.png";
import b from "../images/B.png";
import c from "../images/C.png";

const Questions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [questions, setQuestions] = useState([]);
  const score = useRef(0); // Para el puntaje
  const navigate = useNavigate();

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    const shuffledQuestions = preguntasData.preguntas
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
      
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    //setScore(0); // Reiniciar puntaje
    setSelectedOption(null);
    setHasAnswered(false);
  };

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    setHasAnswered(true);

    console.log("antes",index,score);
    console.log(index === currentQuestion.respuesta_correcta);
    
    

    // Aumentar puntaje si la respuesta es correcta
    if (index === currentQuestion.respuesta_correcta) {
      score.current= score.current + 10
      console.log(score.current);
      
    }

    setTimeout(() => {
      setSelectedOption(null);
      setHasAnswered(false);

      // Avanzar al siguiente índice de pregunta
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        // Navegar a Results al finalizar las preguntas
        navigate('/results', { state: { score:score.current } });
      }
    }, 2000);
  };

  const letterImages = [a, b, c];

  return (
    <div className="relative w-full h-screen">
      <style>
        {`
          @font-face {
            font-family: 'Kanit';
            src: url(${KanitFont}) format('truetype');
            font-weight: normal;
            font-style: normal;
          }
        `}
      </style>

      <img
        src={fondopreg}
        alt="Fondo de preguntas"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {currentQuestion && (
          <>
            <div className="pregunta bg-[#FAC224]/70 w-[872px] h-[350px] mt-[258px] rounded-3xl flex items-center justify-center mb-40 overflow-hidden">
              <p className="text-white text-7xl ml-6 text-center" style={{ fontFamily: 'Kanit' }}>
                {currentQuestion.pregunta}
              </p>
            </div>

            {currentQuestion.opciones.map((opcion, index) => {
              const isCorrect = index === currentQuestion.respuesta_correcta;
              const isSelected = selectedOption === index;

              const bgColor = hasAnswered && isCorrect ? 'bg-[#3DFA24]' : 'bg-[#FAC224]/70';

              return (
                <div
                  key={index}
                  className={`${bgColor} w-[872px] mb-14 h-[175px] rounded-3xl flex items-center cursor-pointer overflow-hidden px-6`}
                  onClick={() => handleOptionClick(index)}
                >
                  <img src={letterImages[index]} alt={`Opción ${index}`} className="w-10 h-12 mr-4" />
                  <p className="text-white text-4xl ml-6 text-left" style={{ overflowWrap: 'break-word', fontFamily: 'Kanit' }}>
                    {opcion}
                  </p>
                  {isCorrect && isSelected && (
                    <span className="text-white ml-4">✓</span>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Questions;
