import { createContext, useState, useEffect } from "react";
import { decodeToken, isExpired } from "react-jwt";
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'


const KioscosAuthContext = createContext();

const KioscosAuthProvider = ({children}) => {

    const [ token, setToken ] = useState(null)
    const [ usuarioActual, setUsuarioActual ] = useState(null);
    const location = useLocation()
    const navigate = useNavigate()
    
    useEffect( async () => {
        // Verificar si hay un token en localStorage
        if( localStorage.getItem('KioscosToken') ) {
            setToken(localStorage.getItem('KioscosToken'))
            let tknDecode = decodeToken(token)
            let expiro = isExpired(token)   
            await handleObtenerUsuario(tknDecode, expiro)
                    
        }else if( location.pathname.split('/').includes('cliente') && !usuarioActual ){
            // Asegurarse de que tenga acceso unicamente a las rutas permitidas
            navigate('/login')
        }
    }, [])

    useEffect( async () => {
        if( token ){
            let tknDecode = decodeToken(token)
            let expiro = isExpired(token)            
            await handleObtenerUsuario(tknDecode, expiro)
            localStorage.setItem('KioscosToken', token)
        }
    }, [ token ])
    
    const handleObtenerUsuario = async  (tkn, expiro) => {

        if( !tkn ) return;
        axios.get(`${import.meta.env.VITE_API_URL}/usuarios/${tkn.id}`,{email: tkn.id}).then( (res) => {
            
            if( tkn && !expiro ) {
                setUsuarioActual(res.data)
            }else setUsuarioActual(null)
        }, (err) => {
            setUsuarioActual(null)
        })
    }
    
    return (
        <KioscosAuthContext.Provider
            value={{
                setToken,
                usuarioActual,
            }}
        >
            {children}
        </KioscosAuthContext.Provider>
    )
}

export {
    KioscosAuthProvider
}

export default KioscosAuthContext