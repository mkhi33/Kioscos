
import useKioscosCliente from "../hooks/useKioscosCliente";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { formatearDinero } from '../helpers'

import { useState } from 'react';
const Producto = ({producto}) => {
    const { handleSetProducto, handleChangeModal } = useKioscosCliente();

    const sx = {
        maxWidth: 500,
        minWidth: 200 ,
    }

    return (
        <Card sx={sx}>
           
            <CardMedia
                component="img"
                alt={producto?.name}
                height="140"
                image={producto?.image}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    <span className='font-bold text-2xl'>
                        {producto?.name}
                    </span>
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    <span className="text-amber-500 font-bold">
                        {formatearDinero(producto?.price)}
                    </span>
                </Typography>

            <button
                type="button"
                className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                onClick={ () => {
                    
                    handleChangeModal()
                    handleSetProducto(producto)
                }}
            >Agregar</button>

            </CardContent>

        </Card>
    )

}

export default Producto