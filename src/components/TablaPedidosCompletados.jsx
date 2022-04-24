import React from 'react'

const TablaPedidosCompletados = ({pedidos}) => {
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
                                <img src='https://res.cloudinary.com/dicifr3km/image/upload/v1650832515/kioscos/assets/img-1_ux3u7n.svg' />
                            </div>
                            <span>Carlos Cortes</span>
                        </div>
                    </th>
                    <td className="px-6 py-4">
                        12
                    </td>
                    <td className="px-6 py-4">
                        HN 103.24
                    </td>
                    <td className="px-6 py-4">
                        Completado
                    </td>

                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        <div className='flex flex-row  gap-4'>
                            <div className='w-10'>
                                <img src='https://res.cloudinary.com/dicifr3km/image/upload/v1650832515/kioscos/assets/img-1_ux3u7n.svg' />
                            </div>
                            <span>Ricardo Rodriguez</span>
                        </div>
                    </th>
                    <td className="px-6 py-4">
                        12
                    </td>
                    <td className="px-6 py-4">
                        HN 195.33
                    </td>
                    <td className="px-6 py-4">
                        Completado
                    </td>

                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        <div className='flex flex-row  gap-4'>
                            <div className='w-10'>
                                <img src='https://res.cloudinary.com/dicifr3km/image/upload/v1650832515/kioscos/assets/img-1_ux3u7n.svg' />
                            </div>
                            <span>Isaac Hernadez</span>
                        </div>
                    </th>
                    <td className="px-6 py-4">
                        12
                    </td>
                    <td className="px-6 py-4">
                        HN 195.33
                    </td>
                    <td className="px-6 py-4">
                        Completado
                    </td>

                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        <div className='flex flex-row  gap-4'>
                            <div className='w-10'>
                                <img src='https://res.cloudinary.com/dicifr3km/image/upload/v1650832515/kioscos/assets/img-1_ux3u7n.svg' />
                            </div>
                            <span>Andres Perez</span>
                        </div>
                    </th>
                    <td className="px-6 py-4">
                        12
                    </td>
                    <td className="px-6 py-4">
                        HN 195.33
                    </td>
                    <td className="px-6 py-4">
                        Completado
                    </td>

                </tr>
                
            </tbody>
        </table>
    </div>
  )
}

export default TablaPedidosCompletados