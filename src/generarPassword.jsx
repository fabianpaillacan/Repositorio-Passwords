import { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, User, Globe, Edit3, Check, X } from "lucide-react";

export default function Generate() {
    const [caracteres, setCaracteres] = useState(8);
    const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const simbolos = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '|', '/', '?', '>', '<', '~', '`', 'ñ', 'Ñ', 'á', 'é', 'í', 'ó', 'ú', 'Á', 'É', 'Í', 'Ó', 'Ú'];
    const [password, setPassword] = useState("");

    const generarPassword = () => {

    }


    return (
        <div className="max-w-md mx-auto px-4 py-8 grid grid-rows-3 gap-y-3 border-2 border-gray-500 rounded-md pd-2">
           <p className="text-white font-bold text-xl">Password</p> <input className="border-2 border-gray-300 rounded-md"></input>
           <p className="text-white font-bold text-xl">Numero de caracteres {caracteres}</p>
            <input type="range"
            min="4"
            max="32"
            value={caracteres}
            onChange={(e) => setCaracteres(e.target.value)}
            ></input>
            <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Generar</button>
        </div>
    )
}