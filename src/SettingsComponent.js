import React, {useEffect, useState} from 'react';
import {IconButton,Grid,MenuItem,Menu,Typography,AppBar,Toolbar,Box} from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import jwt from 'jsonwebtoken';



const SettingsComponent = (props)=>{


const [anchorEl, setAnchorEl] =useState(null);
const [user, setUser] = useState([]);
const localToken = localStorage.getItem('token');
var decodedToken = jwt.decode(localToken);

useEffect(async ()=>{
    
if(decodedToken==null){
    props.history.push('/');
    alert("Session Timeout Please Login Again...");
}else{
        if(decodedToken.exp*1000<=Date.now()){
        props.history.push('/');
        }else{
        var response = await axios.get('http://localhost:3001/users/getuser',
        {
            headers:{ token:localToken }
        })

        let createData = response.data;
        Filter(createData);
    }
}},[])

const Filter = (filterData)=>{
    
    let loginUser = decodedToken.user;
    let createdData = '';
    createdData = filterData.filter(function(ele){
        return ele.username===loginUser.username && ele.phone===loginUser.phone && ele.fname===loginUser.fname && ele.lname===loginUser.lname;
    })
    setUser(createdData);
}


const profile = ()=>{
    props.history.push('/profile');
};

const home = ()=>{
    props.history.push('/home');
};

const cart = ()=>{
    props.history.push('/cart');
};

const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    };
    
const handleClose = () => {
    setAnchorEl(null);
    };

const logout = ()=>{
    localStorage.removeItem('token');
    props.history.push('/');
    alert('You have been logged out');
    }

return (
    <Box sx={{ flexGrow: 1}}>
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton onClick={()=>{props.history.goBack()}} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <NavigateBeforeIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center'}}>
                    Settings
                </Typography>
                {(
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        sx={{opacity: 0.95}}
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
                        onClick={handleClose}
                    >
                        <Typography sx={{  display: 'flex', justifyContent: 'center', m:-1}}><h3>Hi {decodedToken.user.fname} !</h3></Typography>
                        <MenuItem sx={{ display: 'flex', justifyContent: 'center', width:'170px'}} onClick ={profile}>profile</MenuItem>
                        <MenuItem sx={{ display: 'flex', justifyContent: 'center'}} onClick ={home}>Home</MenuItem>
                        <MenuItem sx={{ display: 'flex', justifyContent: 'center'}} onClick ={cart}>Cart</MenuItem>
                        <MenuItem sx={{ display: 'flex', justifyContent: 'center'}} onClick={logout}>Logout</MenuItem>
                        
                    </Menu>
                </div>
                )}
            </Toolbar>
        </AppBar>
        <Grid container  sx={{'& .MuiTextField-root':{ mt:3},display: 'flex', justifyContent: 'center',mt:7}}>
            <h2>Welcom To Settings</h2>
        </Grid>
    </Box>
    );
}

export default SettingsComponent;