
import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import useKioscosAuth from '../hooks/useKioscosAuth';
import axios from 'axios'
import { useNavigate, useLocation } from "react-router-dom"
import {  toast } from 'react-toastify';
const SigIn = () => {
    
    const [ mostrarPassword, setMostrarPassword ] = useState(false)
    const [usuario, setUsuario] = useState({
      password: '',
      email: '',
      usuario:''
    });

    const ref = useRef()
    const { setToken } = useKioscosAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
        useEffect( () => {
          if( location.pathname.split("/").includes('verificar') ){
            // validar el token
            const token = location.pathname.split("/").pop()
            
            axios.get(`${import.meta.env.VITE_API_URL}/usuarios/confirmar/${token}`).then( res => {

              navigate('/login')
              alert('Cuenta verificada correctamente')
              toast.success(res.msj)

            }, err => {
              const error = err.toJSON()
              if(error.status === 403 ){
                toast.error("Token no válido")
                return
              }
              toast.error("Error, no se pudo verificar el usuario")

            })
          }
        }, [])
        
    
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

  const handleSubmit = ( e ) => {
    e.preventDefault()

    axios.post(`${import.meta.env.VITE_API_URL}/usuarios/login`, usuario ).then( res => {
      
      setToken(res.data.token)
      toast.success("Inicio de sesión correctamente")

      if( usuario.usuario === 'cliente') {
        navigate('/cliente')
      }
    }, err => {
      const error = err.toJSON()
      if( error.status === 404 ){
        toast.error("Correo o contraseña incorrectos")
        return;
      }
      
      if( error.status === 403 ){
        toast.error("Tu cuente todavía no ha sido confirmada")
        return;
      }
      
    })
    
    
  }

  return (

    <div className="bg-amber-500 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 ">
      <div className="h-auto md:h-auto lg:h-screen container mx-auto">

        <h1 className="text-white text-4xl m-5 ">Ordena comida de tus restaurantes favoritos</h1>
        <img className="w-10/12 ml-auto mr-auto" src="../../assets/img-2.svg" />

      </div>

      <div className="bg-white border rounded-l-3xl">
        <div className="my-16">

          <Box
              
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '100%' },
              }}
              noValidate
              autoComplete="off"
              className="grid grid-row justify-center"
              onSubmit={handleSubmit}
              
            >

              <h1 className="font-bold text-center">Iniciar Sesión</h1>

        
              
              <TextField type="email" name="email" onChange={handleChange} label="Correo Electrónico" variant="filled" />

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

            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Tipo de Usuario</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel name="usuario" onChange={handleChange} value="cliente" control={<Radio />} label="Cliente" />
                <FormControlLabel name="usuario" onChange={handleChange} value="restaurante" control={<Radio />} label="Restaurante" />
                
  
              </RadioGroup>
            </FormControl>


              <button className='bg-indigo-700 p-4 border rounded text-white hover:bg-indigo-800' type="submit">Iniciar Sesión</button>
              <div className='grid grid-cols-2'>
                <p className='text-center'>¿No tienes una cuenta?</p>
                <a className='text-center text-green-700 font-bold hover:text-indigo-800' href="/signUp">Registrate</a>
              </div>
            </Box>      
        </div>
        
      </div>

    </div>
  )



}

export default SigIn