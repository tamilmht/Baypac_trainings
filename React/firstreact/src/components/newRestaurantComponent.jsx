import React, { useState } from 'react'
import { Container,Paper,Grid, Box, styled, FormControlLabel} from '@material-ui/core';
import {TextField, Typography, InputLabel, MenuItem, FormControl, Select, Switch} from '@mui/material';
import { Country, State, City }  from 'country-state-city';

const initialcsc = {
    country : {value : '',selected : false},
    state : {value : '',selected : false},
    city : {value : '',selected : false}
}

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontWeight: theme.typography.fontWeightBold
    
  }));

const Newrestaurant = () => {

    const [csc,setcsc] = useState(initialcsc)

  const handleChange = (event) => {
    console.log(event)
    setcsc((prevdata) => ({...prevdata,[event.target.name]:{...prevdata[event.target.name],value:event.target.value,selected: event.target.value ? true : false}}));
  };
    
    
    return(
        <Container fixed >
            <Paper>
                <br />
                <Typography align='center' variant='h4'>Add The Below Details To Register Your Restaurant</Typography>
                <br />
                <br />
                <Box ml={15}>
                    <Grid container spacing={2} >
                        <Grid item xs={6} md={6}>
                            <TextField sx={{width:450}} label="Restaurant Name" helperText="Provide Name as per Registration" 
                            inputProps={{ maxLength: 100 }} variant='standard'/>
                        </Grid>
                    
                        <Grid item xs={6} md={4}>
                            <TextField label="Contact Number" variant='standard' inputProps={{ maxLength: 10 }}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={6} md={1}>
                            <TextField sx={{width:84}} label="Building No" variant='standard' inputProps={{ maxLength: 8 }}/>
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <TextField sx={{width:270}} label="Address Line 1" variant='standard'inputProps={{ maxLength: 50 }}/>
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <TextField sx={{width:270}} label="Address Line 2" variant='standard' inputProps={{ maxLength: 50 }}/>
                        </Grid>

                        <Grid item xs={6} md={1}>
                            <TextField sx={{width:90}} label="Pincode" variant='standard' inputProps={{ maxLength: 8 }}/>
                        </Grid>
                    </Grid>
                    
                    <Grid container spacing={3}>
                        <Grid item xs={6} md={3}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
                            <InputLabel>Country</InputLabel>
                            <Select
                            name='country'
                            value={csc.country.value}
                            onChange={handleChange}
                            >
                                <MenuItem value='Select'><em>Select</em></MenuItem>
                                {Country.getAllCountries().map((country,index) => {return <MenuItem key={index} value = {country.isoCode}>{country.name}</MenuItem>})}
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
                            <InputLabel>State</InputLabel>
                            <Select
                            name='state'
                            value={csc.state.value}
                            onChange={handleChange}
                            disabled = {!csc.country.selected.toString()} 
                            >
                                <MenuItem value=''><em>Select</em></MenuItem>
                                {State.getStatesOfCountry(csc.country.value).map((state,index) => {return <MenuItem key={index} value = {state.isoCode}>{state.name}</MenuItem>})}
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={5}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
                            <InputLabel>City</InputLabel>
                            <Select
                            name='city'
                            value={csc.city.value}
                            onChange={handleChange}
                            disabled = {!csc.state.selected.toString()}
                            >
                                <MenuItem value=''><em>Select</em></MenuItem>
                                {City.getCitiesOfState(csc.country.value,csc.state.value).map((city,index) => {return <MenuItem key={index} value = {city.isoCode}>{city.name}</MenuItem>})}
                            </Select>
                            </FormControl>
                        </Grid>
                        <br />
                        <Div>{'Update Reservation Type Details'}</Div>
                        <Grid container spacing={3}>
                            <Grid item xs={6} md={3}>
                                <FormControlLabel control={<Switch name='budget'/>} label='Budget Type Reservation'/>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <FormControlLabel control={<Switch name='midrange'/>} label='Midrange Type Reservation'/>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <FormControlLabel control={<Switch name='luxury'/>} label='Luxury Type Reservation'/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <br />
            </Paper>
        </Container>
    )
}

export default Newrestaurant;