import {useState, useEffect} from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useKioscosRestaurante  from '../hooks/useKioscosRestaurante'
import { formatearDinero } from '../helpers';
import ModalPedidos from './ModalPedidos';
const TablaPedidos = ({pedidos}) => {

    const { modalPedidos, setModalPedidos } = useKioscosRestaurante()
    const [ ordenSeleccionada, setOrden ] = useState({});

    const handleVerOrden = ( orden ) => {
        setOrden(orden)
        setModalPedidos(true)
    }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <ModalPedidos orden={ordenSeleccionada} />
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Cliente
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Mesa
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Total Pedido
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Estado
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Ver Orden</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                { pedidos.map( pedido => (

                    <tr key={pedido.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                            <div className='flex flex-row  gap-4'>
                                <div className='w-10'>
                                    {pedido.usuario.image ? <img src={pedido.usuario.image} /> : <AccountCircleIcon />}
                                </div>
                                <span>{`${pedido.usuario.name} ${pedido.usuario.lastName}`}</span>
                            </div>
                        </th>
                        <td className="px-6 py-4">
                            {pedido.table.number}
                        </td>
                        <td className="px-6 py-4">
                            {formatearDinero(pedido.total)}
                        </td>
                        <td className="px-6 py-4">
                            {pedido.state}
                        </td>
                        <td className="px-6 py-4 text-right">
                            <button onClick={ () => handleVerOrden(pedido)} className='bg-indigo-500 hover:bg-indigo-700 p-2 text-white rounded'>Ver Orden</button>
                        </td>
                    </tr>
                ))}    
            </tbody>
        </table>
    </div>
  )
}

export default TablaPedidos