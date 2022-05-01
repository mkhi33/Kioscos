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
    <div className="bg-amber-500 flex  flex-col-reverse lg:flex-row">
      <div className="h-auto md:h-auto lg:h-screen container mx-auto lg:w-2/4 hidden lg:block">
        <h1 className="text-white text-4xl m-5 ">Ordena comida de tus restaurantes favoritos</h1>
        <img className="w-10/12" src="https://res.cloudinary.com/dicifr3km/image/upload/v1650832499/kioscos/assets/personas_tnbg41.svg" />
      </div>

      <div className="bg-white rounded-none lg:rounded-lg  lg:w-2/4 h-screen">
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