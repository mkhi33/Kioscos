
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Alerta = ({ tipo, mensaje }) => {
    /**
     * tipo: error | warning | info | success 
     */
    return (
        <Stack sx={{ m: 1, width: '25ch'}} spacing={2}>
          <Alert severity={tipo}>{mensaje}</Alert>
        </Stack>
      );
}

export default Alerta