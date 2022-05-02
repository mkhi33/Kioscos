
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useKioscosCliente from '../hooks/useKioscosCliente';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { formatearDinero } from '../helpers';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const ModalProducto = () => {

  const { modal, setModal, producto, handleAgregarPedido, pedido } = useKioscosCliente();
  const [ cantidad, setCantidad ] = useState(0);
  const [ edicion, setEdicion ] = useState(false);


 
  
  const handleClose = () => setModal(false);

  const modificarCantidad = ( valor ) => {
    if( cantidad === 0 && valor === -1 ) {
      return;
    }

    setCantidad(cantidad + valor)
  }

  useEffect( () => {
    if( pedido.some( (pedidoState) => pedidoState.id === producto.id ) ){
        const productoEdicion = pedido.find((pedidoState) => pedidoState.id === producto.id)
        setEdicion(true);
        setCantidad(productoEdicion.cantidad)


    }else {
        setCantidad(0)
        setEdicion(false);
    }

  }, [ producto, pedido ])



  
    return (
      <div >
        <Modal
          open={modal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        
        >
          
          <Box sx={style}>

            <div className='flex flex-col'>
                <CloseIcon className="ml-auto cursor-pointer" onClick={handleClose} />
              <div className='flex flex-col lg:flex-row gap-4'>
                <div className="w-full lg:w-2/4">
                  <img src={producto.image}/>
                </div>

                <div className="text-4xl w-full  lg:w-2/4">
                  <div className="flex flex-col">

                    <div className="w-full">
                      <Typography  variant="h6" component="h2">
                        {producto.name}
                      </Typography>
                    </div>

                    <div className='w-ful'>
                      <Typography style={{fontSize:"35px"}} className="text-amber-500">{formatearDinero(producto.price)}</Typography>
                    </div>

                    <div className='flex flex-row justify-center gap-2'>
                      <RemoveCircleIcon onClick={ () => modificarCantidad(-1)} className="cursor-pointer"  style={{fontSize:"32px"}}/>
                      <span className='' style={{fontSize:"32px"}}>{cantidad}</span>
                      <AddCircleIcon onClick={ () => modificarCantidad(1)} className="cursor-pointer" style={{fontSize:"32px"}} />

                    </div>

                    <div className='w-full '>
                      <button
                        type="button"
                        className="bg-indigo-600 hover:bg-indigo-800 px-2 py-2 mt-5 text-white text-xl  font-bold uppercase rounded"
                        onClick={ () => handleAgregarPedido({...producto, cantidad})}
                      >{edicion ? `Guardar Cambios` :`Añadir al Pedido`}</button>

                    </div>

                  </div>

                </div>
              </div>
              
            </div>

          
          </Box>
        </Modal>

      </div>
    );
  
}

export default ModalProducto

