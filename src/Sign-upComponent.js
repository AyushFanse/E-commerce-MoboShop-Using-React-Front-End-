import React, {useState} from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
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
const [Worning,setWorning] = useState('');
const DataBase = 'https://e-commerce-mobo-website.herokuapp.com';

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

let response = '';           
    try{  
             
        if(first_name==='' && last_name==='' && username===''  && email==='' && address==='' && number==='' && password==='' ) {   
            setWorning({status:'error', msg:'Please fill all the details..!!!'})   
        }else{     
            response = await axios.post(`${DataBase}/register/registerUser`, {
                username:username.value,
                first_name:first_name.value,
                last_name:last_name.value,
                email: email.value,
                address:address.value,
                number:number.value,
                password: password.value
            })
        
            setWorning(response.data);
            console.log()
            if(response.data.status==='success'){
                props.history.push('/');   
            }}
    } catch (err) {
            setWorning({status:'error', msg:err.response.data.msg});
            alert(err.response.data.msg);
    }
}

//-------------------------------* VALIDATION FUNCTIONS *-------------------------------//
return (
    <>
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
                {
                        Worning?.status==='error'
                    ? 
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert variant="filled" severity="error">{Worning.msg}</Alert>
                        </Stack>
                    : 
                        null
                }
                <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
                    <Box sx={{ '& .MuiTextField-root': { m: 1.8,width: '12ch' }}}>
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
                    <Box sx={{ mt:-2, '& .MuiTextField-root': {m: 1.8, width: 293}}}>
                        <TextField
                            id="standard"
                            label="Username"
                            size="small"
                            variant="standard"
                            value={props.username}
                            onChange={(e) => {setUsername(e.currentTarget)}}
                            />
                    </Box>
                    <Box sx={{  mt:-2,'& .MuiTextField-root': { m: 1.8, width: 293}}}>
                        <TextField
                                id="standard"
                                label="Email"
                                size="small"
                                variant="standard"
                                value={props.email}
                                onChange={(e) => {setEmail(e.currentTarget)}}
                                />  
                    </Box>
                    <Box sx={{ mt:-2, '& .MuiTextField-root': {m: 1.8, width: 293}}}>
                        <TextField
                            id="standard"
                            label="Number"
                            size="small"
                            variant="standard"
                            value={props.number}
                            onChange={(e) => {setNumber(e.currentTarget)}}
                            />
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
                    <Box sx={{'& .MuiTextField-root': { m: 1.8, width: 293}}}>
                        <TextField
                            id="standard"
                            label="Address"
                            size="small"
                            variant="standard"
                            value={props.address}
                            onChange={(e) => {setAddress(e.currentTarget)}}
                            />
                    </Box>
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
    </>
)
}

export default LoginComponent;
