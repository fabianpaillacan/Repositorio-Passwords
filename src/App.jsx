import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import Home from './home'; // este es el nuevo componente que contiene el botón
import Storage from "./Storage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
