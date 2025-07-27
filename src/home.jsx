import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Contraseña from "./Formulario";
import Storage from "./Storage"

export default function Home() {
  /*const navigate = useNavigate();*/
  const [visible, setVisible] = useState(false);

  const alternarVisibilidad = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-5xl font-bold">Gestor</h1>
      </div>

      <Contraseña />

    <div className="flex justify-center items-center -md p-4 max-w-md mx-auto">
      <button 
        onClick={alternarVisibilidad}
        className="bg-green-500 text-white py-2 rounded hover:bg-blue-600 w-[415px]"
      >
       {visible ? 'Ocultar' : 'Mostrar'}
      </button>
    </div>
    <section> {visible && <Storage></Storage>}</section>
    </>
  );
}
