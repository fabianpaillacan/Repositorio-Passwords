import { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, User, Globe, Edit3, Check, X } from "lucide-react";

export default function Generate({ onGenerar }) {
    const [caracteres, setCaracteres] = useState(8);
    const [checkedState, setCheckedState] = useState({
        minusculas: true,
        mayusculas: true,
        simbolos: true,
        numeros: true
    });
    const letrasMayusculas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const letrasMinusculas = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const simbolos = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '|', '/', '?', '>', '<', '~', '`', 'ñ', 'Ñ', 'á', 'é', 'í', 'ó', 'ú', 'Á', 'É', 'Í', 'Ó', 'Ú'];
    const seleccionCaracteres = [];
    const [password, setPassword] = useState("");

    const handleOnChange = (checkboxName) => {
        setCheckedState(prevState => ({
            ...prevState,
            [checkboxName]: !prevState[checkboxName]
        }));
    };

    const generarPassword = () => {
        let cadena = "";
            if(checkedState.minusculas){
                seleccionCaracteres.push(...letrasMinusculas);
            }
            if(checkedState.mayusculas){
                seleccionCaracteres.push(...letrasMayusculas);
            }
            if(checkedState.numeros){
                seleccionCaracteres.push(...numeros);
            }
            if(checkedState.simbolos){
                seleccionCaracteres.push(...simbolos);
            }
            if (
                !checkedState.minusculas &&
                !checkedState.mayusculas &&
                !checkedState.simbolos &&
                !checkedState.numeros
              ) {
                alert("Todos están desactivados ❌");
              }
            for(let i = 0; i <caracteres; i++){
                cadena += seleccionCaracteres[Math.floor(Math.random() * seleccionCaracteres.length)]; 
            } 
        setPassword(cadena);
        onGenerar(password);
    }


    return (
        <div className="max-w-md mx-auto px-4 py-8 grid grid-rows-3 gap-y-3 border-2 border-gray-500 rounded-md pd-2">
           <p className="text-white font-bold text-xl">Password</p> 
           <input
            className="border-2 border-gray-300 rounded-md bg-sky-950 text-white"
            value={password}
            readOnly
            />
           <p className="text-white font-bold text-xl">Numero de caracteres {caracteres}</p>
            <input type="range"
            min="4"
            max="32"
            value={caracteres}
            onChange={(e) => setCaracteres(e.target.value)}
            ></input>
                 <div className="flex flex-col gap-2">
           <div className="flex items-center gap-2">
             <input
               type="checkbox"
               id="minusculas"
               name="minusculas"
               checked={checkedState.minusculas}
               onChange={() => handleOnChange('minusculas')}
               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
             />
             <label htmlFor="minusculas" className="text-white">
               Minúsculas
             </label>
           </div>
           
           <div className="flex items-center gap-2">
             <input
               type="checkbox"
               id="mayusculas"
               name="mayusculas"
               checked={checkedState.mayusculas}
               onChange={() => handleOnChange('mayusculas')}
               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
             />
             <label htmlFor="mayusculas" className="text-white">
               Mayúsculas
             </label>
           </div>
           
           <div className="flex items-center gap-2">
             <input
               type="checkbox"
               id="simbolos"
               name="simbolos"
               checked={checkedState.simbolos}
               onChange={() => handleOnChange('simbolos')}
               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
             />
             <label htmlFor="simbolos" className="text-white">
               Símbolos
             </label>
           </div>
           
           <div className="flex items-center gap-2">
             <input
               type="checkbox"
               id="numeros"
               name="numeros"
               checked={checkedState.numeros}
               onChange={() => handleOnChange('numeros')}
               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
             />
             <label htmlFor="numeros" className="text-white">
               Números
             </label>
           </div>
         </div>
            <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={() => generarPassword ()}>Generar</button>
        </div>
    )
}