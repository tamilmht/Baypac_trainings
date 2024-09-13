import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({element : Element}) => {
    const {User} = useContext(AuthContext)
  
    return(
      User ?  Element  : <Navigate to = '/' />
    );
  
  }

export default PrivateRoute