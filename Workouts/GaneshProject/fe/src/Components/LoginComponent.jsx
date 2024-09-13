import { useState, useContext } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Grid, Button } from '@mui/material';
import Login_Background_Image from '../Media/Login_Background_Image.jpg'
import { AuthContext } from "../AuthContext";
import { useNavigate } from 'react-router-dom';


const drawerWidth = 350;


export default function LoginForm(){

    const navigate = useNavigate()
    const { Login } = useContext(AuthContext);
    const[InputField,SetInputField] = useState({email : '',password:''});
    const [isloggedin, setisloggedin] = useState(null)

    function Inputhandler(e) {
        const { name, value } = e.target;
        // console.log(name,value)
        SetInputField((prevState) => ({ ...prevState, [name]: value }));
    };

    const Loginsubmit = async() =>{
        const success = await Login(InputField);
        if(success){
            navigate('/dashboard');
            setisloggedin(success)
        }
        setisloggedin(!success)
    };

    

    return (
        <Box sx={{backgroundImage: `url(${Login_Background_Image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height:'100vh'}}>
            <CssBaseline />
            <Drawer
                sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: 'primary.main'
                },
                }}
                variant="permanent"
                anchor="right"
            >
            <Box component="section" sx={{backgroundColor:'white', marginTop:drawerWidth/10, marginLeft:'20px', marginRight:'15px'
            }}>
            <Grid container spacing={2} padding={3}>
                <Grid item>
                    <TextField id = 'outlined-required' label='Email' name = 'email' variant='outlined' onChange={Inputhandler}/>                     
                </Grid>
                <Grid item>
                    <TextField id = 'outlined-password-input' label='Password' name = 'password' variant='outlined' type='password' onChange={Inputhandler}/> 
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={Loginsubmit} disabled={InputField['email'].length === 0 || InputField['password'].length === 0}>Login</Button>
                </Grid>
                <Grid item>
                    <a href="">Forgot Password?</a>
                </Grid>
                <Grid item>
                    <a href="/register">Click here to Register</a>
                </Grid>
                <Grid item>
                    {isloggedin && <div>Invalid Email or Password</div>}
                </Grid>
            </Grid>
            </Box>
            
            </Drawer>
        </Box>     
    )
};