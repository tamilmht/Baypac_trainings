import { useState } from "react";
import client from '../axiosconfig';
import {useNavigate} from 'react-router-dom';

export default function SignupForm(){
    const navigate = useNavigate()
    const formInputFieldsInital = {firstname : {data : '',validationtext : '',validationstatus : false},
                                    lastname : {data : '',validationtext : '',validationstatus : false},
                                       email : {data : '',validationtext : '',validationstatus : false},
                                      mobile : {data : '',validationtext : '',validationstatus : false},
                                    password : {data : '',validationtext : '',validationstatus : false},
                             confirmpassword : {data : '',validationtext : '',validationstatus : false}
                    };
    const [formInputFields,setFormInputFields] = useState(formInputFieldsInital);

    const setFormInputFieldsHandler = async (e) => {
        const formInputFieldValidData = await formInputFieldsValidator(e.target.name, e.target.value);
        const [formInputFieldValidError,formInputFieldValidStatus] = [(formInputFieldValidData === 'OK' ? (e.target.name === 'password' ? 'Password is Strong' : e.target.name === 'confirmpassword' ? 'Password Match' : '') : formInputFieldValidData),(formInputFieldValidData === 'OK' ? true : false)];
        setFormInputFields((PrevState) => ({...PrevState,[e.target.name]:{...PrevState[e.target.name],data:e.target.value,validationtext:formInputFieldValidError,validationstatus:formInputFieldValidStatus}}))
    };
   
    const formInputFieldsValidator = async(formField,formFieldValue) =>{
        if(formFieldValue.length > 0) {
            switch(formField){
                case 'firstname': case 'lastname':
                    if (formFieldValue.startsWith(" ")){
                        return 'Name should not starts with Space'
                    }
                    else if (/\d/.test(formFieldValue)){
                        return 'Name does not include numbers'
                    }
                    else {
                    return 'OK'
                    }
                case 'email':
                    if(!formFieldValue.endsWith('@gmail.com')){
                        return 'Invalid Email'
                    }
                    else if (formFieldValue.startsWith(" ")){
                        return 'Email should not starts with Space'
                    }
                    else {
                        return await validateformdata(formField,formFieldValue)
                    }
                case 'mobile':
                    if(/[^0-9]/g.test(formFieldValue) || formFieldValue.length <=9){
                        return 'Invalid Mobile Number'
                    }
                    else {return await validateformdata(formField,formFieldValue)
                    }
                case 'password':
                    if (formFieldValue.length <= 5){
                        return 'Password is weak'
                    }
                    else if (formFieldValue.length > 5 && formFieldValue.length <= 8){
                        return 'Password is medium'
                    }
                    else{
                        return 'OK'
                    }
                case 'confirmpassword':
                    if(formFieldValue !== formInputFields['password'].data){
                        return 'Password does not match'
                    }
                    else {return 'OK'}
                default:
                    void(0);
            }
        }
    };

    const validateformdata = async (formfield,formvalue) => {
        const response = await client.get("/getvalidateuser",{params :{validatefield : formfield , validatevalue : formvalue}})
        return response.data
    }

    const ValidationStyle = (fieldName) => {
        let classes = "col-sm-8 h-50 d-inline-block fs-6 ";
        switch(fieldName){
            case 'firstname': case 'lastname': case 'email': case 'mobile':
                if(formInputFields[fieldName].validationtext){
                    return classes+'text-danger'
                }else{
                    return classes
                }
            case 'password':
                if(formInputFields[fieldName].data.length <= 5){
                    return classes+'text-danger'
                }
                else if (formInputFields[fieldName].data.length > 5 && formInputFields[fieldName].data.length <= 8){
                    return classes+'text-warning'
                }
                else if (formInputFields[fieldName].data.length > 8){
                    return classes+'text-success'
                }
                else{
                    return classes
                }
            case 'confirmpassword':
                if(formInputFields[fieldName].validationstatus){
                    return classes+'text-success'
                }else {return classes}
            default:
                return classes;
        }
    }

    const submitnewuser = () => {client.post('/userSignUp',formInputFields)
        .then(function (response){
            if(response.status === 200){
                alert(`Hello ${response.data.lastname} ${response.data.firstname},\nUser Registration is Completed\nLogin with Email and Password`)
                navigate('/')
            }
        })
        .catch(function(error){
            console.log(error)
        })
    }

    return(
            <div className="container w-50 p-5 mt-5 mr-5 border rounded">
                <div className="p-3 text-center">
                    <h1>Signup</h1> 
                    <h6>All the below fields are mandatory(*)</h6>
                </div>
            <form>
                <div className="row mb-3">
                    <div className="col">
                        <input className="col-sm-8" type="text" name="firstname" placeholder="First Name" maxLength={30}
                        onChange={setFormInputFieldsHandler}/>
                        <div className={ValidationStyle('firstname')}>
                            {formInputFields['firstname'].validationtext}
                        </div>
                    </div>
                    <div className="col">
                        <input className="col-sm-8" type="text" name="lastname" placeholder="Last Name" maxLength={30}
                        onChange={setFormInputFieldsHandler}/>
                        <div className={ValidationStyle('lastname')}>
                            {formInputFields['lastname'].validationtext}
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <input className="col-sm-8" type="text" name="email" placeholder="E-mail"
                        onChange={setFormInputFieldsHandler}/>
                        <div className={ValidationStyle('email')}>
                            {formInputFields['email'].validationtext}
                        </div>
                    </div>
                    <div className="col">
                        <input className="col-sm-8" type="text" name="mobile" placeholder="Mobile" maxLength={10}
                        onChange={setFormInputFieldsHandler}/>
                        <div className={ValidationStyle('mobile')}>
                            {formInputFields['mobile'].validationtext}
                        </div>
                    </div>
                </div>
                
                <div className="row mb-3">
                    <div className="col">
                        <input className="col-sm-8" type="password" name="password" placeholder="Password" maxLength={20}
                        onChange={setFormInputFieldsHandler}/>
                        <div className={ValidationStyle('password')}>
                            {formInputFields['password'].validationtext}
                        </div>
                    </div>
                    <div className="col">
                        <input className="col-sm-8" type="password" name="confirmpassword" placeholder="Confirm Password"
                        onChange={setFormInputFieldsHandler}/>
                        <div className={ValidationStyle('confirmpassword')}>
                            {formInputFields['confirmpassword'].validationtext}
                        </div>
                    </div>
                </div>
                                
                <div>
                    <button type='button' disabled={formInputFields.email.validationstatus === false || formInputFields.mobile.validationstatus === false 
                        || formInputFields.password.validationstatus === false || formInputFields.confirmpassword.validationstatus === false} className="btn btn-sm col-sm-1 border"
                        onClick={submitnewuser}>Submit
                    </button>
                    <div className="col-sm-9 text-end text-decoration-underline"><a className="page-link" href="/">If Already Registered - Click here to Login!</a></div>
                </div>         
            </form>
        </div>
     )
}