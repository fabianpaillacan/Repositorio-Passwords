// PasswordForm.jsx
import { useState } from "react";

const campos = [
  { name: "sitio", placeholder: "Ingresar el sitio web", id: 1 },
  { name: "usuario", placeholder: "Ingresar usuario o correo electrónico", id: 2 },
  { name: "password", placeholder: "Ingresar la contraseña", id: 3 },
];

export default function PasswordForm() {
  const [formulario, setFormulario] = useState({
    sitio: "",
    usuario: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGuardar = () => {
    try {
      const existentes = JSON.parse(localStorage.getItem("passwords") || "[]");
      const actualizado = [...existentes, formulario];
      localStorage.setItem("passwords", JSON.stringify(actualizado));
  
      // Verificar que se haya guardado correctamente
      const verificado = JSON.parse(localStorage.getItem("passwords") || "[]");
      const ultima = verificado[verificado.length - 1];
  
      if (
        ultima.sitio === formulario.sitio &&
        ultima.usuario === formulario.usuario &&
        ultima.password === formulario.password
      ) {
        alert("✅ Guardado exitosamente");
      } else {
        alert("⚠️ Algo falló al guardar");
      }
  
      // Limpiar formulario
      setFormulario({ sitio: "", usuario: "", password: "" });
    } catch (error) {
      console.error("❌ Error al guardar en localStorage:", error);
    }
  };
  

  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto">
      {campos.map((campo) => (
        <input
          key={campo.id}
          name={campo.name}
          placeholder={campo.placeholder}
          value={formulario[campo.name]}
          onChange={handleChange}
          className="p-2 border rounded"
        />
      ))}
      <button
        onClick={handleGuardar}
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Guardar contraseña
      </button>
    </div>
  );
}
