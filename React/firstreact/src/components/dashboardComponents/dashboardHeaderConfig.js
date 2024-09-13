import {makeStyles} from '@material-ui/core'
const drawerWidth = 190;
const HeaderComponentStyles = makeStyles((theme) => ({
        appbar:{
            width: `calc(100% - ${drawerWidth}px)`, 
            marginLeft: `${drawerWidth}px`
        },
        drawer:{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
        },
        dashcontent : {
            marginTop : "70px",
            marginLeft: `${drawerWidth+10}px`,
            width: `calc(100% - ${drawerWidth}px)`, 
        },
        title: {
         mr: 2,
         display: { xs: 'none', md: 'flex' },
         fontFamily: 'monospace',
         fontWeight: 700,
         letterSpacing: '.3rem',
         color: 'inherit',
         textDecoration: 'none',
         },
         link: {
           textDecoration: "none",
           color: "white",
           fontSize: "20px",
           marginLeft: theme.spacing(20),
           border : "none",
           background : "none",
           "&:hover": {
             color: "black",
             backgroundColor : "none"
           },
         },
         btn:{
             border : "none",
             background : "none",
             color : "white"
         },
         userdetail:{
             marginLeft:"40px"
         }
    }))

export default HeaderComponentStyles