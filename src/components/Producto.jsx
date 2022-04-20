
import { formatearDinero } from '../helpers'
import useKioscosCliente from "../hooks/useKioscosCliente";
const Producto = ({producto}) => {

    const { name, image, price } = producto;
    const { handleSetProducto, handleChangeModal } = useKioscosCliente();

  return (
    <div className="border p-3">
        <img src={`../../assets/img/${image}`}  alt={`Imagen platillo ${name}`} width={400} height={500}/>

        <div className="p-5">
            <h3 className="text-2xl font-bold">{name}</h3>
            <p className="mt-5 font-black text-3xl text-amber-500">
                {formatearDinero(price)}
            </p>
            <button
                type="button"
                className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                onClick={ () => {
                    
                    handleChangeModal()
                    handleSetProducto(producto)
                }}
            >Agregar</button>
        </div>
    </div>
  )
}

export default Producto