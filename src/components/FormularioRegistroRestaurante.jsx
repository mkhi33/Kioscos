import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios'
import {  toast } from 'react-toastify';
import Alerta from './Alerta';

const FormularioRestaurante = () => {
    const [ imagen, setImagen ] = useState(null)
    const [ mostrarPassword, setMostrarPassword ] = useState(false)
    const [usuario, setUsuario] = useState({
        name: '',
        rtn: '',
        password: '',
        email: ''
    });

    const [ estadoRegistro, setEstadoRegistro] = useState({
      estado: '',  // ok: Usuario registrado correctamente, error: El usuario no se pudo registrar
      msj:'' 
    })


    const ref = useRef()
    
    const getBase64 = async (file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            
          setImagen(reader.result);
          setUsuario({...usuario, image: reader.result})
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

  const handleSubmit = (e) => {
    e.preventDefault()

    if( Object.values(usuario).includes('') ) {
      toast.error('Todos los campos son obligatorios')
      
      return;
    }
    axios.post(`${import.meta.env.VITE_API_URL}/restaurantes`, usuario).then( res => {

      setEstadoRegistro({
        estado: 'success',
        msj: 'Se envio un correo con las instrucciones para validar su cuenta de restaurante'
      })
      setUsuario({
        name: '',
        rtn: '',
        password: '',
        email: ''
    })
    }, error => {
        const err = error.toJSON();
        switch (err.status) {
          case 400:
            setEstadoRegistro({
              estado: 'error',
              msj: 'Ya existe restaurante registrado con este correo'
            })
            break;
          case 402:
            setEstadoRegistro({
              estado: 'error',
              msj: 'No se pudo registrar el usuario'
            })
            break;
        
          default:
            setEstadoRegistro({
              estado: 'error',
              msj: 'No se pudo registrar el restaurante'
            })
            break;
        }
      setEstadoRegistro({
        estado: 'error',
        msj: 'El restaurante ya esta registrado'
      })
    })
  }
  return (
    <Box           
    component="form"
    sx={{
        '& > :not(style)': { m: 1, width: '100%' },
    }}
    noValidate
    autoComplete="off"
    className="flex flex-col justify-center mx-5 my-5"
    onSubmit={handleSubmit}
    >
    <h1 className="font-bold text-center">Registrar Restaurante</h1>
    { imagen ? 
        (
            <div className='flex flex-col'>
                <img style={{width:"100px", height:"100px", marginLeft:"auto", marginRight:"auto", borderRadius:"100%"}} src={imagen} />
                <button className="bg-red-600 text-white p-2 mt-2 " onClick={reset}>Eliminar Imagen</button>
            </div>
        )
        :   
        <div className="flex flex-col">
            <AccountCircleIcon 
                style={{fontSize:"100px", marginLeft:"auto", marginRight:"auto", borderRadius:"100%"}}
            />
            <input type="file"  onChange={  (e) =>  getBase64(e.target.files[0])} />
        </div>
    }

    <TextField  name="name" value={usuario.name} onChange={handleChange} label="Nombre" placeholder='Ejem. Pizza Hut' variant="filled" />
    <TextField name="rtn" value={usuario.rtn} onChange={handleChange} label="RTN" placeholder='Ejem. 070398753159' variant="filled" />
    <TextField type="email" value={usuario.email} name="email" onChange={handleChange} label="Correo Electrónico" variant="filled" />

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
    { estadoRegistro.estado && <Alerta tipo={estadoRegistro.estado} mensaje={estadoRegistro.msj} />}

    
    <button className='bg-indigo-700 p-4 border rounded text-white hover:bg-indigo-800' type="submit">Crear cuenta</button>
    <div className='grid grid-cols-2'>
        <p className='text-center'>¿Ya tienes una cuenta?</p>
        <Link className='text-center text-green-700 font-bold hover:text-indigo-800' to="/login">Iniciar Sesión</Link>
    </div>
    </Box>  
  )
}

export default FormularioRestaurante