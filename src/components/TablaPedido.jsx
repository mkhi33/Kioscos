import { formatearDinero } from '../helpers'

const TablaPedido = ({orden}) => {

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Producto
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Cantidad
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Precio Unitario
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Precio Total
                    </th>
                </tr>
            </thead>
            <tbody>
                
                {
                    orden.order_products.map( producto => (

                        <tr key={producto.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                <span className="font-bold text-2">{producto.name}</span>
                            </th>
                            <td className="px-6 py-4">
                                <span className="font-bold text-2">{producto.cantidad}</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="font-bold text-2">{formatearDinero(producto.price)}</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="font-bold text-2">{formatearDinero( producto.price*producto.cantidad)}</span>
                            </td>
                           
                        </tr>
                    ))
                }

                
            </tbody>
        </table>
    </div>
  )
}

export default TablaPedido