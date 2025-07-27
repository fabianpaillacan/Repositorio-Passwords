import { useNavigate } from "react-router-dom";
import Contraseña from "./Formulario";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-5xl font-bold">Gestor</h1>
      </div>

      <Contraseña />
    <div className="flex justify-center items-center  -md mx-auto">
      <button 
        onClick={() => navigate('/ver')}
        className="bg-green-500 text-white py-2 rounded hover:bg-blue-600 w-[415px]"
      >
        Ver contraseñas
      </button>
      </div>
    </>
  );
}
