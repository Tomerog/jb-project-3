import './Footer.css';
import { Box, Typography } from '@mui/material';

export default function Footer() {
    return (
        <Box component='footer' className='Footer' sx={{
            backgroundColor: '#434955  ',
            color: 'white',
            textAlign: 'center',
            padding: '1rem',
            marginTop: 'auto',
        }}>
            <Typography variant='body1'>&copy; Vacation website by <strong>Tomer Ognistoff</strong></Typography>
            <Typography variant='body2'>Server: {import.meta.env.VITE_REST_SERVER_URL}</Typography>
        </Box>
    );
}