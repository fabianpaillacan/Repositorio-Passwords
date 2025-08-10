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
  const [visibleForm, setVisibleForm] = useState(false);
  const alternarVisibilidad = () => {
    setVisible(!visible);
  };

  const alternarVisibilidadGenerate = () => {
    setVisibleGenerate(!visibleGenerate);
  };

  const alternarVisibilidadIngresarContraseña = () =>{
    setVisibleForm(!visibleForm);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGuardar = () => {
    // Validar que todos los campos tengan contenido
    if (!formulario.sitio.trim() || !formulario.usuario.trim() || !formulario.password.trim()) {
      alert("⚠️ Por favor, completa todos los campos antes de guardar");
      return;
    }

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
        // Limpiar formulario solo si se guardó correctamente
        setFormulario({id: crypto.randomUUID(),  sitio: "", usuario: "", password: "" });
      } else {
        alert("⚠️ Algo falló al guardar");
      }
    } catch (error) {
      console.error("❌ Error al guardar en localStorage:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header principal */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border-b border-slate-600/30">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Título y logo */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-3 bg-amber-500 rounded-xl shadow-lg">
              <Shield className="w-8 h-8 text-slate-900" />
            </div>
            <h1 className="text-4xl font-bold text-white">Gestor de Contraseñas</h1>
          </div>
          
          {/* Botón principal */}
          <div className="flex justify-center mb-6">
            <button 
              className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors duration-200 font-semibold text-lg shadow-lg" 
              onClick={alternarVisibilidadIngresarContraseña}
            >
              {visibleForm ? 'Ocultar Formulario' : 'Ingresar Contraseña'}
            </button>
          </div>

          {/* Formulario */}
          {visibleForm && (
            <div className="max-w-md mx-auto bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-600/30 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">Nueva Contraseña</h2>
              
              <div className="space-y-4">
                <input
                  name="sitio"
                  placeholder="Ingrese el sitio web"
                  value={formulario.sitio}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                /> 
                
                <input
                  name="usuario"
                  placeholder="Ingrese el correo o usuario"
                  value={formulario.usuario}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                /> 
                
                <input
                  name="password"
                  placeholder="Ingrese la contraseña o genera una"
                  value={formulario.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                /> 
                
                {/* Botón generar contraseña */}
                <button 
                  onClick={alternarVisibilidadGenerate}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-semibold shadow-lg"
                >
                  {visibleGenerate ? 'Ocultar Generador' : 'Generar Contraseña'}
                </button>
                
                {/* Sección del generador */}
                {visibleGenerate && (
                  <div className="mt-4">
                    <Generate onGenerar={recibirPasswordGenerada} />
                  </div>
                )}
                
                {/* Botón guardar */}
                <button
                  onClick={handleGuardar}
                  className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors duration-200 font-semibold shadow-lg"
                >
                  Guardar Contraseña
                </button>
              </div>
            </div>
          )}

          {/* Botón mostrar contraseñas */}
          <div className="flex justify-center mt-6">
            <button
              onClick={alternarVisibilidad}
              className="bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 transition-colors duration-200 font-semibold shadow-lg"
            >
              {visible ? 'Ocultar Contraseñas' : 'Mostrar Contraseñas'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Sección de almacenamiento */}
      {visible && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Storage />
        </div>
      )}
    </div>
  );
}
