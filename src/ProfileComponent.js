import {IconButton,Button,Grid,MenuItem,Menu,TextField,Typography,AppBar,Toolbar,Box} from '@mui/material';
import React, {useEffect, useState} from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import jwt from 'jsonwebtoken';



const ProfileComponent = (props)=>{


const [anchorEl, setAnchorEl] =useState(null);
const [userData, setUser] = useState([]);
const localToken = localStorage.getItem('token');
var decodedToken = jwt.decode(localToken);


useEffect( () =>{ Fatch() })

const Fatch = (async()=>{
    if(decodedToken==null){
        props.history.push('/');
        alert("Session Timeout Please Login Again...");
    }else{
            if(decodedToken.exp*1000<=Date.now()){
            props.history.push('/');
            }else{
            var response = await axios.get('https://e-commerce-mobo-website.herokuapp.com/users/getuser',
            {
                headers:{ token:localToken }
            })
    
            let createData = response.data;
            Filter(createData);
        }
}})


const Filter = (filterData)=>{

    let loginUser = decodedToken.user;
    let createdData = '';
    createdData = filterData.filter(function(ele){
        return ele.username===loginUser.username && ele.phone===loginUser.phone && ele.fname===loginUser.fname && ele.lname===loginUser.lname;
    })
    setUser(createdData);
}


const DeleteAccount = (async (id)=>{

    if(decodedToken==null){
      props.history.push('/');
      alert("Session Timeout Please Login Again...");
    }else{
        if(decodedToken.exp*1000<=Date.now()){
        props.history.push('/');
        }else{
        await axios.delete(`https://e-commerce-mobo-website.herokuapp.com/users/deleteuser/${id}`)
        localStorage.removeItem('token');
        props.history.push('/');
        alert('Your Account has been deleted Successfully');
}}})

const home = ()=>{
    props.history.push('/home');
};

const cart = ()=>{
    props.history.push('/cart');
};

const settings = ()=>{
    props.history.push('/settings');
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
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    My Profile
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
                        <MenuItem sx={{width:'170px', display: 'flex', justifyContent: 'center' }} onClick ={home}>Home</MenuItem>
                        <MenuItem sx={{ display: 'flex', justifyContent: 'center'}} onClick ={cart}>Cart</MenuItem>
                        <MenuItem sx={{ display: 'flex', justifyContent: 'center' }} onClick ={settings}>Settings</MenuItem>
                        <MenuItem sx={{ display: 'flex', justifyContent: 'center' }} onClick={logout}>Logout</MenuItem>
                        
                    </Menu>
                </div>
                )}
            </Toolbar>
        </AppBar>
        <Grid container  sx={{'& .MuiTextField-root':{ mt:3},display: 'flex', justifyContent: 'center',mt:7}}>
            {userData.map((user)=>(<Box>
                <div style={{padding:"20px", background:'#c8e4fb', width:'350px'}}  key={user._id}>
                    <form  style={{textAlign: 'center'}}>
                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1.8,width: '13.6ch' }}}>
                            <TextField
                                id="standard"
                                label="First-Name"
                                size="small"
                                variant="standard"
                                value={user.first_name}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                id="standard"
                                label="Last-Name"
                                size="small"
                                variant="standard"
                                value={user.last_name}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Box>
                        <Box component="form" sx={{'& .MuiTextField-root': {m: 1.8, width: 293}}}>
                            <TextField
                                id="standard"
                                label="Username"
                                size="small"
                                variant="standard"
                                value={user.username}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Box>
                        <Box component="form" sx={{'& .MuiTextField-root': {m: 1.8, width: 293}}}>
                            <TextField
                                id="standard"
                                label="Number"
                                size="small"
                                variant="standard"
                                value={user.number}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Box>
                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1.8, width: 293}}}>
                            <TextField
                                    id="standard"
                                    label="Email"
                                    size="small"
                                    variant="standard"
                                    value={user.email}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />                                    
                        </Box>
                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1.8, width: 293}}}>
                            <TextField
                                id="standard"
                                label="Address"
                                size="small"
                                variant="standard"
                                value={user.address}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Box>
                    </form>
                    <Grid sx={{ display: 'flex', justifyContent: 'center'}}>
                        <Button sx={{ minWidth:150, border:1.7, mt:2, borderRadius:'10px'}} onClick={()=>{DeleteAccount(user._id)}} variant="outlined">
                                Delete My Account
                        </Button>
                    </Grid>
                </div>
            </Box>))}   
        </Grid>
    </Box>
    );
}

export default ProfileComponent;