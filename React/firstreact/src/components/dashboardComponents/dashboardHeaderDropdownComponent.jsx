import React, {useRef, useState} from 'react';
import {Popper, Grow, Paper, MenuList, MenuItem} from '@material-ui/core';
import HeaderComponentStyles from './dashboardHeaderConfig';

const Headerdropdown = (props) => {
  const classes = HeaderComponentStyles(props);
  const noderef = useRef(null);
  const [dropdown,setdropdown] = useState(false)
  const dropdownstate = () => {
      setdropdown(!dropdown)
    };

      const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
          event.preventDefault();
          setdropdown(false);
        } else if (event.key === 'Escape') {
          setdropdown(false);
        }
      }

    return(
        <div onMouseEnter={dropdownstate} onMouseLeave={dropdownstate}>
            <button type='button' name={props.name} className={classes.link} ref={noderef} id='composition-button'
              aria-controls={dropdown ? 'composition-menu' : undefined} aria-expanded= {dropdown ? 'true' : undefined}
              aria-haspopup = 'true'>
                {props.name}
            </button>
            <Popper open={dropdown} anchorEl={noderef.current} role={undefined} placement='bottom-start' transition disablePortal
            >
                {({TransitionProps, placement}) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom-start' ? 'left top' : 'left bottom',
                  }}
                >
                  <Paper>
                      <MenuList
                        autoFocusItem={dropdown} id='composition-menu' aria-labelledby='composition-button'
                        onKeyDown={handleListKeyDown}
                      >
                        {props.btnnamelist.map((name,index) => {return <MenuItem key={name}  onClick={() => {props.buttonclicked(index)}}>{name}</MenuItem>})}
                      </MenuList>
                    
                  </Paper>
                </Grow>
              )}
            </Popper>
        </div>
    )
}

export default Headerdropdown