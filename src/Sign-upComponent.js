import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {IconButton,Button,Grid,TextField,FormControl,InputLabel,Input,AppBar,Link,Toolbar,Typography,InputAdornment,Box} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const LoginComponent = (props) => {


const [email, setEmail] = useState('');
const [password,setPassword] = useState('');
const [first_name,setFirstName] = useState('');
const [last_name,setLastName] = useState('');
const [address,setAddress] = useState('');
const [username,setUsername] = useState('');
const [number,setNumber] = useState('');
const [showPassword,setShowPassword] = useState('');
const [numberValide,setNumberValide] = useState(false);
const [emailValide,setEmailValide] = useState(false);
const [usernameValide,setUsernameValide] = useState(false);
const [emails,setEmails] = useState('');
const DataBase = 'https://e-commerce-mobo-website.herokuapp.com/';

//-------------------------------* USE-STATE METHODS *-------------------------------//
useEffect( () =>{ Fatch() })
const Fatch = (async()=>{
    var response = await axios.get(`${DataBase}users/getusers`)
            setEmails(response.data)
})
//-------------------------------* PASSWORD VISIBILITY FUNCTIONS *-------------------------------//

const handleClickShowPassword = (e) => {
    setShowPassword(e.currentTarget);
};

const handleMouseDownPassword = (event) => {
event.preventDefault();
setShowPassword('');
};

const handleSubmit = async (e) => {

e.preventDefault();
let ValidateEmail = '';
let ValidateUsername = '';
let ValidateNumber = '';

if(emails!==''){
    ValidateEmail = emails.filter(function(use){
        console.log(use.email)
          return use.email===email.value;
        })
        
    ValidateUsername = emails.filter(function(use){
          return use.username===username.value;
        })

    ValidateNumber = emails.filter(function(use){   
          return use.number===number.value;
        })
}
    if(ValidateEmail===''?true:false){
        if(ValidateUsername===''?true:false){
            if(ValidateNumber===''?true:false){                
                try{        
                    await axios.post(`${DataBase}register/registerUser`, {
                        username:username.value,
                        first_name:first_name.value,
                        last_name:last_name.value,
                        email: email.value,
                        address:address.value,
                        number:number.value,
                        password: password.value
                    })
                    

                    alert('You Have Successfully Registered Your Account..!');
                    props.history.push('/');   
                }
                catch(err) {
                    if(err.response.data.msg === undefined){
                        alert('Fill all the details');
                    }else{
                        alert(err.response.data.msg);
                    }
                    console.warn(err);
                    }
            }else{
                alert('This Number has already been used');
                setNumberValide(true);
            }
        }else{
        alert('This Username has already been used');
        setUsernameValide(true);
        }
    }else{
    alert('This Email has already been used');
    setEmailValide(true);        
    }
}

//-------------------------------* VALIDATION FUNCTIONS *-------------------------------//

if(email===null){
    setEmailValide(false);
}

if(username===null){
    setUsernameValide(false);
}

if(number===null){
    setNumberValide(false);
}


return (
    <>
        <Box>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton onClick={()=>{props.history.goBack()}} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <NavigateBeforeIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Sign-Up
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{'& .MuiTextField-root':{ mt:2},display: 'flex', justifyContent: 'center',mt:10}}>
                <Grid style={{padding:"20px", background:'#c8e4fb', width:'377px', borderRadius:'16px'}}  sx={{border:2, borderColor: 'primary.main'}}>
                    <form  style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1.8,width: '13.6ch' }}}>
                            <TextField
                                id="standard"
                                label="First-Name"
                                size="small"
                                variant="standard"
                                aria-required="true"
                                value={props.first_name}
                                onChange={(e) => {setFirstName(e.currentTarget)}}
                                />
                            <TextField
                                id="standard"
                                label="Last-Name"
                                size="small"
                                variant="standard"
                                value={props.last_name}
                                onChange={(e) => {setLastName(e.currentTarget)}}
                                />
                        </Box>
                        <Box component="form" sx={{ mt:-2, '& .MuiTextField-root': {m: 1.8, width: 293}}}>
                            <TextField
                                id="standard"
                                label="Username"
                                size="small"
                                variant="standard"
                                value={props.username}
                                onChange={(e) => {setUsername(e.currentTarget)}}
                                />
                                {usernameValide ? <br/> : null}
                                {usernameValide ? <sup id="subForSignIn">This Username has already been used</sup> : null}
                        </Box>
                        <Box component="form" sx={{ mt:-2, '& .MuiTextField-root': {m: 1.8, width: 293}}}>
                            <TextField
                                id="standard"
                                label="Number"
                                size="small"
                                variant="standard"
                                value={props.number}
                                onChange={(e) => {setNumber(e.currentTarget)}}
                                />
                                {numberValide ? <br/> : null}
                                {numberValide ? <sup id="subForSignIn">This Number has already been used</sup> : null}
                        </Box>
                        <FormControl sx={{ '& .MuiTextField-root': { m: 0}}}>
                            <InputLabel htmlFor="standard-adornment-password" sx={{ml:-1.7}}>Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword? 'text' : 'password'}
                                value={props.password}
                                size="small"
                                sx={{width: 293}}
                                onChange={(e) => {setPassword(e.currentTarget)}}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        >
                                        {showPassword ? <VisibilityOff />  : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1.8, width: 293}}}>
                            <TextField
                                    id="standard"
                                    label="Email"
                                    size="small"
                                    variant="standard"
                                    value={props.email}
                                    onChange={(e) => {setEmail(e.currentTarget)}}
                                    />  
                                    {emailValide ? <br/> : null}
                                    {emailValide ? <sup id="subForSignIn">This Email has already been used</sup> : null}                                  
                        </Box>
                        <Box component="form" sx={{  mt:-2, '& .MuiTextField-root': { m: 1.8, width: 293}}}>
                            <TextField
                                id="standard"
                                label="Address"
                                size="small"
                                variant="standard"
                                value={props.address}
                                onChange={(e) => {setAddress(e.currentTarget)}}
                                /></Box>
                        <Grid sx={{textAlign: 'center'}}>
                            <Button sx={{mt:2}} type="submit" variant="contained" disableElevation >
                                Create Account
                            </Button>
                            <Grid sx={{textAlign: 'center', mb:-2, cursor: 'pointer'}}>
                                <p>Already have account ? <Link onClick={() =>{props.history.push('/')}} variant="body2">Log-In</Link></p>
                            </Grid>                            
                        </Grid>
                    </form>
                </Grid>
            </Box> 
        </Box>            
    </>
)
}

export default LoginComponent;
