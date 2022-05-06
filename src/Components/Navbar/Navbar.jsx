import React, { useState, useEffect } from 'react';
import { IconButton, Grid, Badge, Box, Typography, AppBar, Toolbar, MenuItem, Menu, Tooltip } from '@mui/material';
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import {NavigateBefore, ShoppingCart, SearchTwoTone, AccountCircle, LogoutRounded, HomeRounded, AccountCircleRounded, LoginTwoTone } from '@mui/icons-material';
import './navbar.css';


function Navbar({page, search, saved}) {

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [login, setLogin] = useState(false);
    const history = useHistory();         
    const localToken = localStorage.getItem('token');
    const decodedToken = jwt.decode(localToken);
    const user =decodedToken?.user;
   

//-------------------------------* USE-EFFECT FUNCTION *-------------------------------//
    useEffect(()=>{ 
        if(decodedToken===null){
            setLogin(true);
        }
    },[decodedToken,login])
 
//-------------------------------* NAVIGATION MENU STATE *-------------------------------//
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    
//-------------------------------* NAVIGATION MENU FUNCTIONS *-------------------------------//
    const Home = ()=>{
        history.push('/');
    };

    const Login = ()=>{
        history.push('/login');
    };
    
    const Profile = ()=>{
        history.push('/profile');
    };
        
    const Cart = ()=>{
        history.push('/cart');
    };
    
    const Logout = ()=>{
        localStorage.removeItem('token');
        alert('You have been logged out');
        setAnchorElUser(null);
        setLogin(false);
        history.push('/');
    };
  
    
    return (
        <>
            <AppBar id="appbar">
                <Toolbar> 
                    {
                        page==='Moboshop'
                    ?
                        null
                    :
                        <IconButton onClick={()=>{history.goBack()}} edge="start" aria-label="menu" sx={{ mr: 2 }}>
                            <NavigateBefore id="icons"/>
                        </IconButton>
                    }
                    <Typography variant="h6"  component="div" sx={{ flexGrow: 1, textAlign: 'center', fontFamily:'Montserrat' }}>
                        {page}
                    </Typography>
                    {
                        page==='Moboshop'
                    ?
                        (
                            <>
                                <div id="searchIconBar" sx={{ margin: 2 }}>
                                    <div id="searchIconOut">
                                        <SearchTwoTone id="searchIcon" />
                                    </div>
                                    <input
                                    type="search"
                                    id="searchField"
                                    onChange={(e)=>{search(e.currentTarget.value.toLowerCase())}}
                                    placeholder={"Search…"}
                                    />
                                </div>
                                &nbsp;
                                &nbsp;
                                &nbsp;
                            </>
                        )
                    :
                        null
                    }                            
                    {
                        !login && page==='Moboshop'
                    ?
                        (
                            <>
                              <Badge badgeContent={saved?.length} color="error">
                                <ShoppingCart onClick={()=>{history.push('/cart');}}/>
                              </Badge>
                            </>
                        )
                    :
                        null
                    }
                    {(
                        page==='Error'
                    ?
                        null
                    :
                        <Box sx={{ margin: 1 }}>
                            {
                                login
                            ?                        
                                <Tooltip title="Login" >
                                    <IconButton onClick={Login} id='loginOut' >
                                        <LoginTwoTone id='loginIcon' />
                                        <div id='login'>Login</div>
                                    </IconButton>
                                </Tooltip>
                            :
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, width: '45px' }}>
                                        <AccountCircle sx={{ fontSize:'2rem', color: 'white' }}/>
                                    </IconButton>
                                </Tooltip>
                            }
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem id="menuItemsOut">
                                    <Typography id="menuItemsUser" sx={{ fontFamily:'Montserrat' }} > Hi {user ? user.first_name : 'New User'} !&nbsp;<img className='wave' src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" alt='' /></Typography>
                                </MenuItem>
                            {
                                page==='Moboshop'
                            ?
                                null
                            :
                                <MenuItem id="menuItemsOut" onClick={Home}>
                                    <HomeRounded id="menuItemsIcon"/> &nbsp; &nbsp;
                                    <Typography id="menuItems" >Home</Typography>
                                </MenuItem> 
                            }
                            {
                                page==='Profile'
                            ?
                                null
                            :
                                <MenuItem id="menuItemsOut" onClick={Profile} >
                                    <AccountCircleRounded id="menuItemsIcon"/> &nbsp; &nbsp;
                                    <Typography id="menuItems" >Profile</Typography>
                                </MenuItem>                                                      
                            }
                            {
                                page==='Cart'
                            ?
                                null
                            :
                                <MenuItem id="menuItemsOut" onClick={Cart}>
                                    <ShoppingCart id="menuItemsIcon"/> &nbsp; &nbsp;
                                    <Typography id="menuItems" >Cart</Typography>
                                </MenuItem>                          
                            }
                                <MenuItem id="menuItemsOut" onClick={Logout}>
                                    <LogoutRounded id="menuItemsIcon"/> &nbsp; &nbsp;
                                    <Typography id="menuItems" >Logout</Typography>
                                </MenuItem>  
                            </Menu>
                        </Box>
                    )}                 
                </Toolbar>
                    {
                        page==='Moboshop'
                    ?
                        (
                            <>                                
                                <Grid id="SearchBarForMd">
                                    <div id="searchIconBarForMd" sx={{ margin: 1 }}>
                                        <div id="searchIconOutForMd">
                                            <SearchTwoTone id="searchIcon" />
                                        </div>
                                        <input
                                            type="search"
                                            id="searchFieldForMd"
                                            onChange={(e)=>{search(e.currentTarget.value.toLowerCase())}}
                                            placeholder={"Search…"}
                                        />
                                    </div>
                                </Grid>
                            </>
                        )
                    :
                        null
                    }              
            </AppBar>
        </>
    );
}

export default Navbar;