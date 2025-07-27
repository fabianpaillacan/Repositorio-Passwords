import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

export default function Contraseña() {
  const [dato, setDato] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);

  const handleClick = (item) => {
    setSeleccionado(item);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Actualizar el objeto seleccionado
    const actualizado = { ...seleccionado, [name]: value };
    setSeleccionado(actualizado);

    // Actualizar lista de objetos
    const nuevosDatos = dato.map((item) =>
      item.sitio === seleccionado.sitio ? actualizado : item
    );
    setDato(nuevosDatos);

    // Guardar en localStorage
    localStorage.setItem("passwords", JSON.stringify(nuevosDatos));
  };

  useEffect(() => {
    const objetoJSON = localStorage.getItem("passwords");
    if (objetoJSON) {
      const objeto = JSON.parse(objetoJSON);
      setDato(objeto);
    } else {
      console.log("Objeto no encontrado en localStorage");
    }
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden scroll-smooth"
      style={{ background: "#303532" }}
    >
      {/* Buscador */}
      <section className="w-full max-w-lg mx-auto mt-10 p-2">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
        />
      </section>

      {/* Lista de sitios */}
      <section className="w-full max-w-lg mx-auto mt-10 p-2">
        {dato.map((item, index) => (
          <button
            key={index}
            onClick={() => handleClick(item)}
            className="block w-full text-left bg-gray-700 text-white px-4 py-2 rounded mb-2 hover:bg-gray-600"
          >
            {item.sitio}
          </button>
        ))}
      </section>

      {/* Detalles del sitio seleccionado */}
      {seleccionado && (
        <section className="w-full max-w-lg mx-auto mt-10 p-4 bg-gray-800 text-white rounded space-y-2">
          <div>
            <label className="block mb-1">Sitio:</label>
            <input
              type="text"
              name="sitio"
              value={seleccionado.sitio}
              onChange={handleInputChange}
              className="w-full p-2 text-black rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Usuario:</label>
            <input
              type="text"
              name="usuario"
              value={seleccionado.usuario}
              onChange={handleInputChange}
              className="w-full p-2 text-black rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Contraseña:</label>
            <input
              type="text"
              name="password"
              value={seleccionado.password}
              onChange={handleInputChange}
              className="w-full p-2 text-black rounded"
            />
          </div>
        </section>
      )}
    </div>
  );
}
