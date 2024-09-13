import client from "./axiosconfig";
import { createContext, useState } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({children}) =>{

    const [AuthToken,SetAuthToken] = useState(() => {
         const tokens = localStorage.getItem('AuthToken')
         return tokens ? JSON.parse(tokens)  : null
        } )

    const [User,SetUser] = useState(null
    //     () => {
    //     const tokens = localStorage.getItem('AuthToken')
    //     return tokens ? JSON.parse(atob(tokens.split('.')[1]))  : null
    // }
);

    const [UserFullName, SetUserFullName] = useState({firstname:'',lastname:''})
    

    const Login = async(logindata) => {
        const email = logindata.email;
        const password = logindata.password;
        try{
            const res = await client.post('user/login/',{email,password})
            SetAuthToken(res.data)
            SetUser(res.data.user.email)
            localStorage.setItem('AuthToken', JSON.stringify(res.data))
            // console.log(res.data.user.last_name,', ',res.data.user.first_name)
            SetUserFullName({firstname:res.data.user.first_name,lastname:res.data.user.last_name})
            // console.log(UserFullName)
            return true   
        }
        catch(error){
            return false
        }
    };

    const Logout = () => {
        SetAuthToken(null);
        SetUser(null);
        localStorage.removeItem('AuthToken');
    };

    const Register = async (data) => {
        try{
            await client.post('user/register/',data)
            return true
        }
        catch(error){
            console.log(error,'error')
        }    
    };

    const EmailValidator = async (data) => {
        try{
            const res = await client.post('user/validate/',data)
            return res.data
        }
        catch(error){
            return false
        }
    }

    
    


    return(
        <AuthContext.Provider value={{Login, AuthToken, Logout, Register, User, EmailValidator, UserFullName}}>
            {children}
        </AuthContext.Provider>
    )
};