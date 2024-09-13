import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import LoginForm from './components/loginComponent';
import SignupForm from './components/signupComponent';
import Dashboard from './components/dashboardComponents/dashboardComponent';
// import Dashboarddata from './components/dashboardComponents/dashboardDataComponent';
// import Newrestaurant from './components/newRestaurantComponent'

function App() {
  return (
      <React.Fragment>
        <BrowserRouter>
        <Routes>
        <Route exact path = "/" Component={LoginForm} />
        <Route exact path = "/usersingup" Component={SignupForm} />
        <Route exact path = "/dashboard" Component={Dashboard} />
        <Route exact path = "/dashboard/addrestaurant" Component={Dashboard} />
        
        </Routes>  
        </BrowserRouter>     
      </React.Fragment>
  );
}

export default App;
