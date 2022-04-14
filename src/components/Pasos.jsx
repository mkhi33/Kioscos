import { useLocation, useNavigate } from "react-router-dom";
import useKioscosCliente from "../hooks/useKioscosCliente";

const  pasos = [
    {paso:1, nombre: 'Menú', url:'/cliente/menu'},
    {paso:2, nombre: 'Resumen', url:'/cliente/resumen'},
    {paso:3, nombre: 'Datos y Total', url:'/cliente/total'},

];

const Pasos = () => {

    let location = useLocation();
    const navigate = useNavigate();

    const calcularProgreso = () => {
        let valor;
        if( location.pathname === '/cliente/menu' ){
            valor = 2
        }else if( location.pathname === '/cliente/resumen' ){
            valor = 50
        }else {
            valor = 100
        }

        return valor
    }


  return (
      
    <>
        <div className="flex flex-col lg:flex-row justify-between mb-5">
            {pasos.map( paso => (
                <button
                    key={paso.paso} 
                    className="text-2xl font-bold "
                    onClick={() => {
                        navigate(paso.url)                       
                    }}
                >
                    {paso.nombre}
                </button>
            ))}
        </div>
        <div className="bg-gray-100 mb-10">
            <div 
                className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white"
                style={{width: `${calcularProgreso()}%`}}
            >
                
            </div>
        </div>
    </>
  )
}

export default Pasos