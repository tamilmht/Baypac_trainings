import { useState, useReducer } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

export default function LoginBlock(props) {
    const [isSignUp, setIsSignUp] = useState(false)

    const initialState = { username: "", password: "", error: "", isLoggedIn: false }

    function loginReducer(state, action) {
        switch (action.type) {
            case 'field':
                return {
                    ...state,
                    ...action.payload
                }
            case 'success':
                return {
                    ...state,
                    isLoggedIn: true,
                    error: ''
                }
            case 'error':
                return {
                    ...state,
                    isLoggedIn: false,
                    error: 'Invalid username or password'
                }
            case 'logout':
                return {
                    ...state,
                    isLoggedIn: false,
                    username: '',
                    password: '',
                    error: ''
                }
        }
    }

    const [state, dispatch] = useReducer(loginReducer, initialState)
    const usernameHandler = (e) => dispatch({ type: "field", payload: { username: e.target.value } })
    const passwordHandler = (e) => dispatch({ type: "field", payload: { password: e.target.value } })
    const logoutHandler = (e) => {
        dispatch({ type: "logout" })
    }

    const loginHandler = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('username'),
            password: data.get('password'),
        });
        if (state.username === "rabit" && state.password === 'rabit')
            dispatch({ type: "success" })
        else
            dispatch({ type: "error" })
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {state.isLoggedIn
                ? <div><Typography>Welcome {state.username}</Typography>
                    <Button
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={logoutHandler}>
                        logout
                    </Button>
                </div>
                : <div>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography>{state.error}</Typography>
                        <Avatar sx={{ m: 1, bgcolor: '#FFA500' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={loginHandler} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="username"
                                label="username"
                                onChange={usernameHandler}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                name="password"
                                onChange={passwordHandler}
                            />
                            <Box textAlign='center'>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                            </Box>
                            <Box textAlign='center'>
                                <Button variant='contained'
                                    sx={{ mt: 3, mb: 2, backgroundColor: "#FFD580" }}
                                >
                                    Click here to SignUp!
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </div>}
        </Container>
    );
}