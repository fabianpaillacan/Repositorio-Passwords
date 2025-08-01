import { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, User, Globe, Edit3, Check, X } from "lucide-react";

export default function Contraseña() {
  const [dato, setDato] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [editando, setEditando] = useState(false);

  const handleClick = (item) => {
    if (seleccionado?.sitio === item.sitio) {
      setSeleccionado(null);
      setEditando(false);
    } else {
      setSeleccionado(item);
      setEditando(false);
    }
    setMostrarPassword(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const actualizado = { ...seleccionado, [name]: value };
    setSeleccionado(actualizado);

    const nuevosDatos = dato.map((item) =>
      item.sitio === seleccionado.sitio ? actualizado : item
    );
    setDato(nuevosDatos);

    // Guardar en localStorage (tu lógica original)
    localStorage.setItem("passwords", JSON.stringify(nuevosDatos));
  };

  const guardarCambios = () => {
    setEditando(false);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header elegante */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border-b border-slate-600/30">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-2 bg-amber-500 rounded-xl shadow-lg">
              <Lock className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Contraseñas</h1>
              <p className="text-slate-400 text-sm">{dato.length} sitios guardados</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {/* Lista de sitios con diseño elegante */}
        {dato.map((item, index) => (
          <div
            key={index}
            className={`transform transition-all duration-200 ${
              seleccionado?.sitio === item.sitio 
                ? 'scale-[1.02] shadow-xl' 
                : 'hover:scale-[1.01] hover:shadow-lg'
            }`}
          >
            <button
              onClick={() => handleClick(item)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                seleccionado?.sitio === item.sitio
                  ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 border-amber-500/30 shadow-amber-500/10'
                  : 'bg-slate-800/30 border-slate-600/20 hover:bg-slate-700/30 hover:border-slate-500/30'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  seleccionado?.sitio === item.sitio 
                    ? 'bg-amber-500' 
                    : 'bg-slate-700'
                }`}>
                  <Globe className={`w-4 h-4 ${
                    seleccionado?.sitio === item.sitio 
                      ? 'text-slate-900' 
                      : 'text-slate-300'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{item.sitio}</h3>
                  <p className="text-slate-400 text-sm truncate">{item.usuario}</p>
                </div>
              </div>
            </button>
          </div>
        ))}

        {/* Panel de detalles */}
        {seleccionado && (
          <div className="bg-gradient-to-br from-slate-800/40 to-slate-700/40 backdrop-blur-sm border border-slate-600/20 rounded-2xl p-6 space-y-4 shadow-2xl mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Edit3 className="w-5 h-5 text-amber-500" />
                <span>Detalles</span>
              </h2>
              {!editando && (
                <button
                  onClick={() => setEditando(true)}
                  className="p-2 text-slate-400 hover:text-amber-500 transition-colors rounded-lg hover:bg-slate-700/30"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Sitio web
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    name="sitio"
                    value={seleccionado.sitio}
                    onChange={handleInputChange}
                    disabled={!editando}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-white transition-all ${
                      editando
                        ? 'bg-slate-700/50 border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50'
                        : 'bg-slate-800/30 border-slate-600/20 cursor-default'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Usuario
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    name="usuario"
                    value={seleccionado.usuario}
                    onChange={handleInputChange}
                    disabled={!editando}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-white transition-all ${
                      editando
                        ? 'bg-slate-700/50 border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50'
                        : 'bg-slate-800/30 border-slate-600/20 cursor-default'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type={mostrarPassword ? "text" : "password"}
                    name="password"
                    value={seleccionado.password}
                    onChange={handleInputChange}
                    disabled={!editando}
                    className={`w-full pl-10 pr-12 py-3 rounded-xl border text-white transition-all ${
                      editando
                        ? 'bg-slate-700/50 border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50'
                        : 'bg-slate-800/30 border-slate-600/20 cursor-default'
                    }`}
                  />
                  <button
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-amber-500 transition-colors p-1 rounded"
                  >
                    {mostrarPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            {editando && (
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={guardarCambios}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-semibold py-3 px-4 rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg flex items-center justify-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Guardar</span>
                </button>
                <button
                  onClick={() => setEditando(false)}
                  className="flex-1 bg-slate-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-slate-500 transition-all flex items-center justify-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Cancelar</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}