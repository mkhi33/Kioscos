import { createContext, useEffect, useState } from "react";
import axios from 'axios'
const KioscosRestauranteContext = createContext();

const KioscosRestauranteProvider = ( { children }) => {

    const [ mesas, setMesas ] = useState([])
    const handleObtenerMesas = async (idRestaurante) => {
        if (!idRestaurante) return;
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/mesas/${idRestaurante}`)
            setMesas(res.data)
        } catch (error) {
            setMesas([])
        }
        
    }
    
    return <KioscosRestauranteContext.Provider
        value={{
            mesas,
            handleObtenerMesas
        }}
    >
        { children }
    </KioscosRestauranteContext.Provider>
}

export {
    KioscosRestauranteProvider
}

export default KioscosRestauranteContext;