import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Trivia from "./Components/Trivia"; // Importa tu componente Trivia
import Registro from  "./Components/Registro"
import Questions from "./Components/Questions";
import Results from "./Components/Results"
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Trivia />} /> 
        <Route path="/registro" element={<Registro />} />
        <Route path="/preguntas" element={<Questions />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
