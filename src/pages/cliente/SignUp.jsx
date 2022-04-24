import FormularioRegistroCliente from "../../components/FormularioRegistroCliente"
import FormularioRegistroRestaurante from '../../components/FormularioRegistroRestaurante'
import Dialogo from "../../components/Dialogo"
import { useState, useEffect } from 'react'
const tipos = ['cliente', 'restaurante'];
const SignUp = () => {
    
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(tipos[0]);

  useEffect( ()=> {
    setOpen(true)
  }, [])


  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };


  return (

    <div className="bg-amber-500 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 ">
      <div className="h-screen container mx-auto">

        <h1 className="text-white text-4xl m-5 ">Ordena comida de tus restaurantes favoritos</h1>
        <img className="w-10/12" src="https://res.cloudinary.com/dicifr3km/image/upload/v1650832499/kioscos/assets/personas_tnbg41.svgg" />

      </div>

      <div className="bg-white border rounded-l-3xl">
        <div className="">
          {selectedValue === 'cliente' ? <FormularioRegistroCliente /> : <FormularioRegistroRestaurante />}
          
          
        </div>
        
      </div>
      <Dialogo 
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  )



}

export default SignUp