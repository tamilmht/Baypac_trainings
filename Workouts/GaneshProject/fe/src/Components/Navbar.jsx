import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AuthContext } from '../AuthContext';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import { Dialog,DialogTitle,DialogContent,DialogActions, DialogContentText } from '@mui/material';
import SignupForm from './SignupComponent';


const navItems = ['Home', 'About', 'Contact'];
export default function Navbar() {

  const navigate = useNavigate()
  const { User,Logout,UserFullName } = useContext(AuthContext)
  const [Mysettings,SetMysettings] = useState(false)

  const btnevents = async (e) =>{
    switch(e.target.id){
      case 'Logout':
        await Logout();
        navigate('/')
        break;
    
      case 'myaccount':
        SetMysettings(true)
        break;

      default:
        void(0);
    }
  }
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 ,height:'70px'} } position='fixed'>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>APP</Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (<Button key={item} id={item} sx={{ color: '#fff' }}>{item}</Button>))}
            {User && 
            <Dropdown>
              <MenuButton sx={{ color: '#fff' }} variant='contained'>{UserFullName.lastname+', '+UserFullName.firstname}</MenuButton>
              <Menu>
                <MenuItem id = 'myaccount' onClick={btnevents}>My Account</MenuItem>
                <MenuItem id = 'Logout' onClick={btnevents}>Logout</MenuItem>
              </Menu>
            </Dropdown>}
          </Box>
        </Toolbar>
      </AppBar>
      <Dialog open ={Mysettings}>
        <DialogTitle><Typography>Please Change any details if required</Typography></DialogTitle>
        <DialogContent>
          <SignupForm LoggedData={{firstname: UserFullName.firstname,lastname: UserFullName.lastname}}/>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={() => SetMysettings(false)}>Back</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}
