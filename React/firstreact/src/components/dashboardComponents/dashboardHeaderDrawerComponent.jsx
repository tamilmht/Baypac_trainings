import React from 'react';
import {Box,Drawer, List, ListItem, CssBaseline,AppBar,Toolbar,Typography,Divider} from '@material-ui/core';
import { ListItemButton, ListItemText } from '@mui/material';
import HeaderComponentStyles from './dashboardHeaderConfig';
import Headerdropdown from './dashboardHeaderDropdownComponent'
import { useNavigate } from 'react-router-dom';
// import Newresort from '../NewResort'



const DashboardHeaderDrawer = (props) => {

    const classes = HeaderComponentStyles(props);
    const navigate = useNavigate();

    const Headerbuttonevents = (headerid,btnid) => {
          // console.log(headerid,btnid)
          if(headerid === 1 && btnid === 1){
            return navigate('/dashboard/addrestaurant')
          }else if(headerid === 0 && btnid === 0){
            return navigate('/dashboard')
          }
          
      }
      // console.log(headerbtn,buttonname)
     
    //ClickAwayListener Tag Function
    // const handleClose = (event) => {
    //   if (noderef.current && noderef.current.contains(event.target)) {
    //     return;
    //   }
  
    //   setdropdown(false);
    // };

      

    const Dropdownlist = [
      {Bookings: ['My Bookings','New Booking','Booking History']},
      {Restaurants: ['My Restaurants','Add Restaurants']},
      {Resorts: ['My Resorts','Add Resorts']},
    ];
    

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appbar}>
      <CssBaseline />
        <Toolbar className="d-flex justify-content-between">
          <div className="d-flex">
            
            {Dropdownlist.map((data,index) => 
            {return <Headerdropdown key={index} btnnamelist = {data[Object.keys(data)[0]]} name = {Object.keys(data)[0]} buttonclicked ={(btnid) => {Headerbuttonevents(index,btnid)}}/>})}
 
            <button type='button' name="contact" className={classes.link}>
              Contact
            </button>
          </div>
          <div className={classes.userdetail}>
              <h6>{props.email}</h6>
              <button className={classes.btn} type='button'>Manage</button>|
              <button className={classes.btn} type='button' onClick={props.logout}>Logout</button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} variant="permanent" anchor="left">
        <Toolbar>
        <Typography variant="h6" nowrap = "true" className={classes.title}>
            ReservEat
        </Typography>
        </Toolbar>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text}>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <Divider /> */}
      </Drawer>
    </Box>
  )
};

export default DashboardHeaderDrawer;