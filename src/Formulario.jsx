// PasswordForm.jsx
import { useState } from "react";
import { Shield, Eye, EyeOff, Database } from "lucide-react";
import Storage from './Storage';
import Generate from './generarPassword';

export default function PasswordForm() {
  const recibirPasswordGenerada = (nuevaPassword) => {
    setFormulario((prev) => ({
      ...prev,
      password: nuevaPassword
    }));
  };
  const [formulario, setFormulario] = useState({
    id: crypto.randomUUID(),
    sitio: "",
    usuario: "",
    password: ""
  }); 

  const [visible, setVisible] = useState(false); //esto es para mostrar y ocultar las contraseñas
  const [visibleGenerate, setVisibleGenerate] = useState(false); //esto es para mostrar y ocultar el boton de generar contraseña

  const alternarVisibilidad = () => {
    setVisible(!visible);
  };

  const alternarVisibilidadGenerate = () => {
    setVisibleGenerate(!visibleGenerate);
  };

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
      setFormulario({id: crypto.randomUUID(),  sitio: "", usuario: "", password: "" });
    } catch (error) {
      console.error("❌ Error al guardar en localStorage:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    {/* Header principal con el mismo estilo */}
    <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border-b border-slate-600/30">
      <div className="max-w-md mx-auto px-4 py-8 grid grid-rows-3 gap-y-3">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-amber-500 rounded-xl shadow-lg">
            <Shield className="w-8 h-8 text-slate-900" />
          </div>
          <h1 className="text-4xl font-bold text-white">Gestor</h1>
          </div>
        <input
            key={1}
            name={"sitio"}
            placeholder={"Ingrese el sitio web"}
            value={formulario.sitio}
            onChange={handleChange}
            className="p-2 border rounded"
        /> 
        <input
            key={2}
            name={"usuario"}
            placeholder={"Ingrese el correo o usuario"}
            value={formulario.usuario}
            onChange={handleChange}
            className="p-2 border rounded"
        /> 
        <input
            key={3}
            name={"password"}
            placeholder={"Ingrese la contraseña o genera una"}
            value={formulario.password}
            onChange={handleChange}
            className="p-2 border rounded"
        /> 
      <button 
      onClick={alternarVisibilidadGenerate}
      className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Generar contraseña
      </button>
      <section> {visibleGenerate && <Generate onGenerar={recibirPasswordGenerada} />}</section>
      <button
        onClick={handleGuardar}
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Guardar contraseña
      </button>
      <button
        onClick={alternarVisibilidad}
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        {visible ? 'Ocultar Contraseñas' : 'Mostrar Contraseñas'} {/*esto es para mostrar y ocultar las contraseñas*/}
      </button>
      </div>
      <section> {visible && <Storage/>}</section>
    </div>
    </div>
  );
}
