import './Header.css';
import useUsername from '../../../hooks/useUsername';
import { useContext } from 'react';
import { AuthContext } from '../../auth/auth/Auth';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export default function Header() {
    const name = useUsername();
    const { logout } = useContext(AuthContext)!;

    function logMeOut() {
        logout();
    }

  

    return (
        <AppBar position='static' sx={{ backgroundColor: '#1976d2', padding: '0.5rem' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h6'>🌴</Typography>
                <Box>
                    <Typography 
                        variant='body1' 
                        sx={{ marginRight: '1rem', display: 'inline-block' }}
                    >
                        Hello {name}
                    </Typography>
                    <Button color='inherit' onClick={logMeOut} variant='outlined'>Logout</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}