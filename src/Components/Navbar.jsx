import React, { useState } from 'react';
import { AppBar, MenuItem, Menu, Box, Toolbar, Typography, IconButton } from '@mui/material';
import { AccountCircle, NavigateBefore } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
  

function Navbar({ user, page }) {
    
  const history = useHistory();
  const [anchorEl, setAnchorEl] =useState(null);

  const handleMenu = (event) => {
      setAnchorEl(event.currentTarget)
  };

  const handleClose = () => {
      setAnchorEl(null);
  };

  const home = ()=>{
      history.replace('/home');
  }
 
const cart = ()=>{
    history.replace('/cart');
} 
  const profile = ()=>{
      history.replace('/profile');
  }
  
  const settings = ()=>{
      history.replace('/settings');
  }

  const logout = ()=>{
      localStorage.removeItem('token');
      history.replace('/');
      alert('You have been logged out');
  }

  return (
      <Box>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={()=>{history.goBack()}} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <NavigateBefore/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              {page}
            </Typography>
              {(
                <div>
                  <IconButton 
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit">
                      <AccountCircle />
                  </IconButton>
                  <Menu id="menu"
                  sx={{opacity: 0.98}}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right'
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right'
                        }}
                        open={Boolean(anchorEl)}
                        onClick={handleClose}>
                    <Typography sx={{  display: 'flex',color:'primary', justifyContent: 'center', m:1, fontSize:'1.2rem', fontWeight:'bold' }}>Hi {user.first_name}!</Typography>
                      <MenuItem sx={{width:'170px', display: 'flex', justifyContent: 'center' }} onClick ={home}>Home</MenuItem>
                      <MenuItem sx={{width:'170px', display: 'flex', justifyContent: 'center' }} onClick ={cart}>Cart</MenuItem>
                      <MenuItem sx={{ display: 'flex', justifyContent: 'center', width:'170px'}} onClick ={profile}>Profile</MenuItem>
                      <MenuItem sx={{ display: 'flex', justifyContent: 'center'}} onClick ={settings}>Settings</MenuItem>
                      <MenuItem sx={{ display: 'flex', justifyContent: 'center'}}  onClick={logout}>Logout</MenuItem>
                  </Menu>
                </div>
              )}
          </Toolbar>
        </AppBar>
      </Box>
  );
}

export default Navbar;