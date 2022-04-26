import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useKioscosRestaurante from '../hooks/useKioscosRestaurante';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TablaPedido from './TablaPedido';
import { formatearDinero } from '../helpers'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios'
import { toast } from 'react-toastify'
import Cronometro from './Cronometro'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ModalPedidos = ( {orden, setOrden} ) => {

    const { modalPedidos, setModalPedidos, handleObtenerPedidos, pedidos, cronometro, setCronometro } = useKioscosRestaurante();
    const [ tiempo, setTiempo ] = useState('')
    const [ data, setData ] = useState({
        state: 'procesando',
        start: "",
        end: "",
    });
    
    const [ timeState, setTimeState ] = useState(null);



    useEffect( () => {
        
        let date = new Date(orden?.end)
        let hora =  date.getHours()
        let minutos = date.getMinutes() < 9 ? `0${date.getMinutes()}` : date.getMinutes()
        setTiempo(`${hora}:${minutos}`)
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

    const handleTomarOrden = (e) => {

        e.preventDefault()

        let inicio = new Date()
        let final = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate(), tiempo.split(":")[0], parseInt(tiempo.split(":")[1]) )
        
        let datos = {
            state: 'procesando',
            start: inicio.toISOString(),
            end: final.toISOString()
        }
        setData(datos)

        axios.put(`${import.meta.env.VITE_API_URL}/orden/${orden.id}/${orden.userId}`, datos).then( res => {
            handleObtenerPedidos(orden?.restaurantId)
            setModalPedidos(false)
            toast.success("Pedido actualizado")
            
        }, err => {
            toast.error("Error, no se pudo actualizar el pedido")
        })
    }

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

                <Stack className="mt-5" component="form" noValidate spacing={3}>
                    <TextField
                        id="time"
                        label="Listo a las:"
                        type="time"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 300, // 5 min
                        }}
                        className="w-full"
                        value={tiempo}
                        onChange = {(e) => {
                            setTiempo(e.target.value)}  
                        } 
                />

                <button onClick={handleTomarOrden} className="bg-indigo-700 hover:bg-indigo-800 p-2 text-white rounded">{orden?.state === 'no_procesado' ? 'Tomar Orden' : 'Actualizar Orden'}</button>
                    
                </Stack>

            </div>
        </Box>
        </Modal>
    </div>
  )
}

export default ModalPedidos