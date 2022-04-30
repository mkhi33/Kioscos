import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useKioscosCliente from '../hooks/useKioscosCliente';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TablaPedido from './TablaPedido'
import { formatearDinero } from '../helpers'

import Cronometro from './Cronometro'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ModalPedidosCliente = ({ orden, setOrden}) => {
    const [ timeState, setTimeState ] = useState(null);
    const { modalPedidos, setModalPedidos } = useKioscosCliente()
    useEffect( () => {
        
        let date = new Date(orden?.end)
        let hora =  date.getHours()
        let minutos = date.getMinutes() < 9 ? `0${date.getMinutes()}` : date.getMinutes()
        actualizarCronometro();
    }, [orden])

    const actualizarCronometro = () => {
        if(orden?.end) {

            let start = new Date()
            start = new Date(start.toISOString())
            let end = new Date(orden.end)
            let dif = (end - start) / 1000 // Diferencia entre las fechas origen
            start.setSeconds(start.getSeconds() + dif )
            setTimeState(start)
            
        }
    }

    const handleClose = () => setModalPedidos(false);

  return (
    <div>

        <Modal
        open={modalPedidos}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <div className="flex flex-col">
                <CloseIcon className="ml-auto cursor-pointer" onClick={handleClose} />

                <div className=''>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Mesa: {orden.table?.number}
                    </Typography>
                </div>

                <div className='flex flex-row gap-1 mt-5'>
                    <div className='w-8'>
                        { orden.usuario?.image ? ( <img src={ orden.usuario?.image } />) : (<AccountCircleIcon />)}
                    </div>
                    <span className='text-sm'>{orden.usuario?.name + " " + orden.usuario?.lastName}</span>
                </div>

                <TablaPedido orden={orden} />

                <div className="flex flex-row gap-4 mt-5">
                    <h3 className='text-bold text-2xl'>Total a pagar:</h3>
                    <span className='text-2xl text-amber-500 '>{formatearDinero(orden.total)}</span>
                </div>

                { timeState && <Cronometro expiryTimestamp={timeState} size='50px'/>}

            
            </div>
        </Box>
        </Modal>
    </div>
  )
}

export default ModalPedidosCliente