import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const TablaPedidos = ({pedidos}) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        <div className='flex flex-row  gap-4'>
                            <div className='w-10'>
                                <AccountCircleIcon />
                            </div>
                            <span>Fernando Cortes</span>
                        </div>
                    </th>
                    <td className="px-6 py-4">
                        12
                    </td>
                    <td className="px-6 py-4">
                        HN 103.24
                    </td>
                    <td className="px-6 py-4">
                        Pendiente
                    </td>
                    <td className="px-6 py-4 text-right">
                        <button className='bg-indigo-500 hover:bg-indigo-700 p-2 text-white rounded'>Ver Orden</button>
                    </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        <div className='flex flex-row  gap-4'>
                            <div className='w-10'>
                                <AccountCircleIcon />
                            </div>
                            <span>Amilcar Rodriguez</span>
                        </div>
                    </th>
                    <td className="px-6 py-4">
                        12
                    </td>
                    <td className="px-6 py-4">
                        HN 195.33
                    </td>
                    <td className="px-6 py-4">
                        Pendiente
                    </td>
                    <td className="px-6 py-4 text-right">
                        <button className='bg-indigo-500 hover:bg-indigo-700 p-2 text-white rounded'>Ver Orden</button>
                    </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        <div className='flex flex-row  gap-4'>
                            <div className='w-10'>
                                <AccountCircleIcon />
                            </div>
                            <span>Rogoberto Hernadez</span>
                        </div>
                    </th>
                    <td className="px-6 py-4">
                        12
                    </td>
                    <td className="px-6 py-4">
                        HN 195.33
                    </td>
                    <td className="px-6 py-4">
                        En proceso
                    </td>
                    <td className="px-6 py-4 text-right">
                        <button className='bg-indigo-500 hover:bg-indigo-700 p-2 text-white rounded'>Ver Orden</button>
                    </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        <div className='flex flex-row  gap-4'>
                            <div className='w-10'>
                                <AccountCircleIcon />
                            </div>
                            <span>Juan Perez</span>
                        </div>
                    </th>
                    <td className="px-6 py-4">
                        12
                    </td>
                    <td className="px-6 py-4">
                        HN 195.33
                    </td>
                    <td className="px-6 py-4">
                        Pendiente
                    </td>
                    <td className="px-6 py-4 text-right">
                        <button className='bg-indigo-500 hover:bg-indigo-700 p-2 text-white rounded'>Ver Orden</button>
                    </td>
                </tr>
                
            </tbody>
        </table>
    </div>
  )
}

export default TablaPedidos