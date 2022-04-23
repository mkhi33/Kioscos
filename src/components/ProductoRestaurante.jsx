import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ProductoRestaurante = ({ producto }) => {
  return (
    <Card sx={{ maxWidth: 500 }}>
        <CardMedia
            component="img"
            alt={producto?.name}
            height="140"
            image={producto?.image}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {producto?.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
                {producto?.price}
            </Typography>

        </CardContent>
        <CardActions className='flex flex-row justify-center'>
            <button className='p-1 bg-amber-500 hover:bg-amber-600 text-white rounded' >Editar</button>
            <button className='p-1 bg-red-500 hover:bg-red-600 text-white rounded' >Eliminar</button>
        </CardActions>
    </Card>
  )
}

export default ProductoRestaurante