import { useState } from "react";
import client from '../axiosconfig';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {useNavigate} from 'react-router-dom'


export default function LoginForm() {
    const win = window.sessionStorage
    const navigate = useNavigate();
    // ReactSession.setStorageType("localStorage")
    const [inputfield,setInputfield] = useState({email : '',password:''});
    const [errordata,setErrorData] = useState('');

    const inputHandler = (e) => {
        const {name,value} = e.target;
        // console.log(name,value)
        setInputfield((prevState) => ({...prevState,[name]:value})); 
    };

    const handleClick = async () => {
        await client.post('/userlogin',inputfield)
        .then(function(response){
            if(response.data === 'VALID'){
                win.setItem("email",inputfield.email)
                setInputfield({email : '',password:''})
                navigate('/dashboard')
            }
            else {
                setErrorData(response.data)
            }
        })
        .catch(function(error){
            console.log(error)
        })
    };


    return(
        <div className="container w-50 p-5 mt-5 mr-5 border rounded">
            <form>
                <div className="row mb-3">
                    <input className="col-sm-4" type="text" name="email" placeholder="E-mail"
                      onChange={inputHandler}
                    />
                </div>
                <div className="row mb-3">
                    <input className="col-sm-4" type="password" name="password" placeholder="Password"
                     onChange={inputHandler}
                    />
                    <div>{errordata}</div>
                </div>  
                <div className="row">
                    <button type='button' onClick={handleClick} className="btn btn-sm col-sm-1 border"
                    disabled={inputfield.email.length === 0 || inputfield.password.length === 0}>Submit</button>
                    <div className="col-sm-8 text-end text-decoration-underline">
                        <Popup trigger={<h6>Forgot Password?</h6>} position="bottom center">
                            You can change password here
                        </Popup>
                    </div>
                    <div className="col-sm-9 text-end text-decoration-underline"><a className="page-link" href="/usersingup">New User - Click Here to Signup!</a></div>
                </div>              
            </form>
        </div>
    );
}