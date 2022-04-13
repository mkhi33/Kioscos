
import { useState, useRef } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const SignUp = () => {
    
    const [ imagen, setImagen ] = useState(null)
    const [ mostrarPassword, setMostrarPassword ] = useState(false)
    const [usuario, setUsuario] = useState({
        name: '',
        lastName: '',
        password: '',
        birth: '01/01/1990',
        email: '',
    });

    const ref = useRef()
    
    const getBase64 = async (file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            
          setImagen(reader.result);
        };
        reader.onerror = function (error) {
          setImagen(null)
        };
     }
        

    const reset = () => {
        setImagen(null)
    }

  const handleChange = event => {
    setUsuario({ ...usuario, [event.target.name]: event.target.value });
  };

  const handleClickMostrarPassword = () => {
    setMostrarPassword( !mostrarPassword );
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (

    <div className="bg-amber-500 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 ">
      <div className="h-screen container mx-auto">

        <h1 className="text-white text-4xl m-5 ">Ordena comida de tus restaurantes favoritos</h1>
        <img className="w-10/12" src="../../assets/personas.svg" />

      </div>

      <div className="bg-white border rounded-l-3xl">
        <div className="">

          <Box
              
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '100%' },
              }}
              noValidate
              autoComplete="off"
              className="grid grid-row justify-center"
              
            >

              <h1 className="font-bold text-center">Registrar Usuario</h1>

              { imagen ? 
                (
                    <div className='flex flex-col'>
                        <img style={{width:"132px", height:"132px", marginLeft:"auto", marginRight:"auto", borderRadius:"100%"}} src={imagen} />
                        <button className="bg-red-600 text-white p-2 mt-2 " onClick={reset}>Eliminar Imagen</button>

                    </div>
                )
                :   
                <div className="flex flex-col">
                    <AccountCircleIcon 
                        style={{fontSize:"132px", marginLeft:"auto", marginRight:"auto", borderRadius:"100%"}}
                    />
                    <input type="file"  onChange={  (e) =>  getBase64(e.target.files[0])} />
                </div>

            }
   


              <TextField  name="nombre" label="Nombre" placeholder='Ejem. Juan Josue' variant="filled" />
              <TextField name="apellido" label="Apellido" placeholder='Ejem. Perez Cruz' variant="filled" />

              <TextField type="email" name="correo" label="Correo Electrónico" variant="filled" />


              <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                  id="filled-adornment-password"
                  type={mostrarPassword ? 'text' : 'password'}
                  value={usuario.password}
                  name="password"
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickMostrarPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {mostrarPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Fecha de nacimiento"
                  value={usuario.birth}
                  onChange={(newValue) => {
                    setUsuario({...usuario, ["birth"]:newValue});
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <button className='bg-indigo-700 p-4 border rounded text-white hover:bg-indigo-800' type="submit">Crear cuenta</button>
              <div className='grid grid-cols-2'>
                <p className='text-center'>¿Ya tienes una cuenta?</p>
                <a className='text-center text-green-700 font-bold hover:text-indigo-800' href="/login">Iniciar Sesión</a>
              </div>
            </Box>      
        </div>
        
      </div>

    </div>
  )



}

export default SignUp