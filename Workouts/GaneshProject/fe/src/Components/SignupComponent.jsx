import { Box, Typography, Grid, Divider,TextField, Button, Paper, Popover, Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material"

import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../AuthContext"
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router-dom";


export default function SignupForm({LoggedData = {}}){
    const navigate = useNavigate()
    const [isFirstRun, setIsFirstRun] = useState(true);
    const { Register, EmailValidator, User } = useContext(AuthContext);
    const [RegistrationInputs,SetRegistrationInputs] = useState({firstname: {data : LoggedData.firstname||'', validationstatus: LoggedData.firstname ? true : false},
                                                                lastname:{data : LoggedData.lastname||'', validationstatus: LoggedData.lastname ? true : false},
                                                                email:{data : '', validationstatus: false},
                                                                password:{data : '', validationstatus: false},
                                                                confirmpassword:{data : '', validationstatus: false}})
    const [EmailOTPValidation,SetEmailOTPValidation] = useState({otpfield:'',validationstatus:null,OTP:'',EmailCheck:false})

    const [ShowPopOver,SetShowPopOver] = useState(false);
    
    const [IsDialogOpen,SetIsDialogOpen] = useState(false);
    
    useEffect(() => {
        if(isFirstRun){
            setIsFirstRun(false);
            return;
        } /* Skips the first run*/
        const timer = setTimeout(() => {
            if(EmailOTPValidation.otpfield === EmailOTPValidation.OTP){
                SetShowPopOver(false);
                const validationstatus = 'validationstatus' /* Just to clear warning */
                SetEmailOTPValidation((PrevState) => ({...PrevState,[validationstatus]:true}));
            } 
        },3000);
        return () => clearTimeout(timer);
    },[EmailOTPValidation.otpfield]);

    const RegistrationInputhandler =  (e) => {
        const {name,value} = e.target
        const RegistrationInputhandlerValidation = value.length === 0 ? false : RegistrationInputhandlerValidate(name,value)
        SetRegistrationInputs((PrevState) => ({...PrevState,[e.target.id]:{...PrevState[e.target.id],data:e.target.value,validationstatus:RegistrationInputhandlerValidation}}))
    }

    const ValidateEmail = async () => {
        const emailtovalidate = RegistrationInputs['email'].data;
        const response = await EmailValidator({'email':emailtovalidate})
        if(response.OTP){
            const OTP = 'OTP' /* Just to clear warning */
            SetShowPopOver(true);
            SetEmailOTPValidation((PrevState) => ({...PrevState,[OTP]:response.OTP}));
        }
        else {
            const validationstatus = 'EmailCheck'
            SetEmailOTPValidation((PrevState) => ({...PrevState,[validationstatus]:true}));
        }
    }

    const ValidateEmailOTPField = async (e) =>{
        
        if(/^\d*$/.test(e.target.value) && e.target.value.length <= 6) {
            SetEmailOTPValidation((PrevState) => ({...PrevState,[e.target.id]:e.target.value}));
          }
    }
    

    function RegistrationInputhandlerValidate(fieldid,fieldvalue){
        switch(fieldid){
            case 'firstname':case 'lastname':
                if (fieldvalue.startsWith(" ") || /\d/.test(fieldvalue)){
                    return false
                }
                else {
                return true
                }
            case 'email':
                if(!fieldvalue.endsWith('@gmail.com') || fieldvalue.startsWith(" ")){
                    return false
                }
                else {
                    return true
                }
            case 'password':
                if (fieldvalue.length <= 8){
                    return false
                }
                else{
                    return true
                }
            case 'confirmpassword':
                if(fieldvalue !== RegistrationInputs['password'].data){
                    return false
                }
                else {return true}
            default:
                void(0);
        }
    }

    const Registerbtn = async() => {
        const Destructured_RegistrationInputs = {};
        for(const key in RegistrationInputs){
            if(key!== 'confirmpassword'){
                Destructured_RegistrationInputs[key] = RegistrationInputs[key].data
            }
        } 
        const res = await Register(Destructured_RegistrationInputs)
        SetIsDialogOpen(res)
    }
    return(
        <Box padding={User ? 0 : 20} >
            <Paper elevation={24}>
                <br/>
                    <Grid container spacing={4} direction="column" justifyContent="space-between" alignItems="center">
                        {!User &&<Grid item>
                            <Typography variant="h4">Registration Form</Typography>
                        </Grid>}
                        <Divider />
                        <Grid item>
                                <TextField required name = 'firstname' value = {RegistrationInputs['firstname'].data} color={RegistrationInputs['firstname'].validationstatus ? 'success' : 'info'} id="firstname" label='First Name' onChange={RegistrationInputhandler} error={RegistrationInputs['firstname'].data.length > 0 && !RegistrationInputs['firstname'].validationstatus}/>
                        </Grid>
                        <Grid item>
                            <TextField required name = 'lastname' value = {RegistrationInputs['lastname'].data} color={RegistrationInputs['lastname'].validationstatus ? 'success' : 'info'} id="lastname" label='Last Name' onChange={RegistrationInputhandler} error={RegistrationInputs['lastname'].data.length > 0 && !RegistrationInputs['lastname'].validationstatus}/>
                        </Grid>
                        {!User &&<Grid item>
                            <Grid container direction="column" justifyContent="space-around">                               
                                <TextField required name = 'email' color={EmailOTPValidation.validationstatus ? 'success' : 'info' } id="email" label='Email' onChange={RegistrationInputhandler} />
                                <Button variant="contained" name = 'getotpbtn' size="small" endIcon={<SendIcon />} onClick={ValidateEmail} disabled = { RegistrationInputs['email'].data.length === 0 || EmailOTPValidation.validationstatus || !RegistrationInputs['email'].validationstatus}>Get otp</Button>
                                {EmailOTPValidation.EmailCheck && <div>Email Already Exists</div>}
                                <Popover open={ShowPopOver} anchorReference="anchorPosition" anchorPosition={{ top: 500, left: 1100 }}>
                                    <Box sx={{display:'flex', flexDirection: 'column'} }>
                                        <TextField name = 'otpfield' value={EmailOTPValidation.otpfield} color = {EmailOTPValidation.otpfield.length === 6 && EmailOTPValidation.otpfield !== EmailOTPValidation.OTP ? 'error' : 'info'} id='otpfield' size="small" placeholder='OTP' onChange={ValidateEmailOTPField}></TextField>
                                        <Box sx={{display:'flex', justifyContent:'space-evenly'} }>
                                            <Button name = 'resendotpbtn' disabled={true}>Resend OTP</Button>
                                            <Button onClick={() => {SetShowPopOver(false)}}>Back</Button></Box>
                                    </Box>
                                </Popover>
                            </Grid>
                        </Grid>}
                        <Grid item>
                            <TextField required name = 'password' color={RegistrationInputs['password'].validationstatus ? 'success' : 'info'} id="password" label='Password' onChange={RegistrationInputhandler} error={RegistrationInputs['password'].data.length >0 && !RegistrationInputs['password'].validationstatus}/>
                        </Grid>
                        <Grid item>
                            <TextField required name = 'confirmpassword'color={RegistrationInputs['confirmpassword'].validationstatus ? 'success' : 'info'} id="confirmpassword" label='Confirm Password' onChange={RegistrationInputhandler} error={RegistrationInputs['confirmpassword'].data.length > 0 && !RegistrationInputs['confirmpassword'].validationstatus }/>
                        </Grid>
                        {!User && <Grid item>
                            <Button name = 'registerbtn' variant="contained" onClick={Registerbtn} 
                            disabled={!RegistrationInputs['firstname'].validationstatus || !RegistrationInputs['lastname'].validationstatus || !RegistrationInputs['email'].validationstatus
                                || !RegistrationInputs['password'].validationstatus || !RegistrationInputs['confirmpassword'].validationstatus || !EmailOTPValidation.validationstatus}>Register</Button>                        
                        </Grid>}
                        {!User && <Grid item>
                            <a href="/">Existing User? Click Here</a>
                        </Grid>}
                    </Grid>
                    <br/>
            </Paper>
            <Dialog open = {IsDialogOpen}>
                <DialogTitle>Hi {RegistrationInputs.lastname.data}, {RegistrationInputs.firstname.data}</DialogTitle>
                <DialogContent>Registration Sucessful, You can use the registered Email and Password, Please Check the mail for Credential Details, Thank You</DialogContent>
                <DialogActions><Button variant="contained" onClick={() => {SetIsDialogOpen(false); navigate('/');}}>OK</Button></DialogActions>
            </Dialog>
        </Box>
    )
}