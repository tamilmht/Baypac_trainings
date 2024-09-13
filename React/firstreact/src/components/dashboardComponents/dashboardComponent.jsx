import React from 'react';
import {useNavigate} from 'react-router-dom';
import client from '../../axiosconfig'
import Dashboarddata from './dashboardDataComponent'


const Dashboard = () => {

    // const location = useLocation();
    const win = window.sessionStorage;

    const navigate = useNavigate();

    const sessionlogout = async () => {
        await client.get('/logout')
        .then((response) => {
            win.clear();
            navigate('/')
        })
    };

    const dashheaddata = {
        email : win.getItem("email"),
        logout : sessionlogout,
    }

    return(
        <>
        {win.length === 0 ? navigate('/') : <Dashboarddata {...{dashheaddata}}/>}
        </>
    )
};

export default Dashboard;