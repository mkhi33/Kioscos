import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import Spinner from './Spinner'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    width:"40rem"
  };

const ModalMesa = ({setModal, modal, restaurantId, setCargandoMesas}) => {

    const [ numero, setNumero ] = useState(null)
    const [ guardando, setGuardando ] = useState(false)
    const handleClose = () => setModal(false);
    const handleNuevMesa = (e) => {
        e.preventDefault()
        setGuardando(true)
        const URL = `${import.meta.env.VITE_API_URL}/mesas`
        const DATA = {
            number: numero,
            qr: null,
            restaurantId
        }
  
        axios.post(URL, DATA ).then( res => {
            toast.success("Se genero el código QR correctamente")
            setGuardando(false)
            setCargandoMesas(true)
            setNumero(null)
        }, err => {
            err = err.toJSON()
            setGuardando(false)
            if( err.status === 400) return toast.error("Ya existe mesa registrada con ese mismo número")
            if( err.status === 401) return toast.error("No se pudo generar el código QR")
            return toast.error("Ocurrio un error")
        })
    }
    return (
    <div>
        <Modal
            open={modal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

                <div className='flex flex-col'>
                    <CloseIcon className="ml-auto cursor-pointer" onClick={handleClose} />
                    <div className='flex gap-4'>
                    { guardando ? (<div className="ml-auto mr-auto"><Spinner  /></div>) :(

                        <div className="w-full">
                            <Typography  variant="h6" component="h2">
                                Nueva Mesa
                            </Typography>
                            <Box
                                component="form"
                                noValidate
                                autoComplete="off"
                                onSubmit={handleNuevMesa}
                                >
              
                                <TextField
                                    label="Número de mesa"
                                    id="filled-hidden-label-small"
                                    variant="filled"
                                    size="small"
                                    type="number"
                                    placeholder='Ejem: 12'
                                    className="w-full"
                                    value={numero}
                                    onChange= { (e)=> setNumero(e.target.value)}
                                />
                                
                                

                                <button type="submit" className="bg-indigo-700 hover:bg-indigo-600 p-2 text-white rounded w-full mt-4 ">Generar QR</button>
                                    
                            </Box>

                        </div>
                    )}

                    </div>
                </div>

                


            </Box>  

        </Modal>
    </div>
  )
}

export default ModalMesa