import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {IconButton,Button,Link,Grid,TextField,FormControl,InputLabel, Input,InputAdornment,Box} from '@mui/material';
import { Visibility, AccountCircle, VisibilityOff, ManageAccounts, LockTwoTone } from '@mui/icons-material';


const LoginComponent = (props) => {
console.log(props)
const history = useHistory();
const [email, setEmail] = useState('');
const [password,setPassword] = useState('');
const [Worning,setWorning] = useState('');
const [showPassword,setShowPassword] = useState('');
const DataBase = 'https://e-commerce-mobo-website.herokuapp.com';
    
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
        if( email==='' && password==='' ){ 
            setWorning({ status:'error', msg:'Please fill all the details..!!!' });      
            }else{
                response = await axios.post(`${DataBase}/register/login`, {
                    password: password.value,
                    email: email.value
                })         
                
                setWorning(response.data);

                if(response.data.status === 'success'){
                    localStorage.setItem( 'token', response.data.userToken );
                    props.history.push('/home');
                }}
    } catch (err) {
        setWorning({status:'error', msg:err.response.data.msg});
        alert(err.response.data.msg);
    }
}


return (
    <>
        <a href='http://localhost:3002/' style={{position:'absolute',right:40, height:'10px' }}>
            <Button style={{display:'flex', cursor:'pointer', alignItems: 'center', textUnderlinePosition: 'under', textTransform: 'capitalize'}}><ManageAccounts style={{color:'#1976d2'}} />Admin Login</Button>
        </a>
        <Box sx={{display: 'flex', justifyContent: 'center' }}>
            <Grid style={{padding:"20px", background:'#c8e4fb',  borderRadius:'5px', borderColor:'primary' , margin:"100px auto", boxShadow: '0px 0px 15px -6px rgba(0, 0, 0, 0.75)'}} sx={{borderBottom:5, borderColor: 'primary.main'}}>
                <h2 style={{textAlign: 'center', cursor: 'default', display:'flex', justifyContent: 'space-evenly', padding: '0px 100px'}}>
                    <LockTwoTone />
                    Login
                </h2>
                {
                    Worning.status==='error'
                ? 
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="filled" severity="error">{Worning.msg}</Alert>
                    </Stack>
                : 
                    null
                }    
                <br/>
                <form onSubmit={(e) => handleSubmit(e)}>
                        <Box sx={{ mt:-2, '& .MuiTextField-root': {m: 1.8, width: 293}}}>
                            <TextField
                                id="input-with-icon-textfield"
                                label="Email"
                                value={props.email}
                                onChange={(e) => {setEmail(e.currentTarget)}}
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                                }}
                                variant="standard"
                            />
                            </Box>
                        <br/>
                        <Grid>
                        <FormControl sx={{ m: 1.8}} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword? 'text' : 'password'}
                                value={props.password}
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
                        </Grid>
                        <Grid sx={{textAlign: 'center'}}>
                            <Button sx={{mt:4}} type="submit" variant="contained" disableElevation >
                                Submit
                            </Button>
                        </Grid>
                        <Grid sx={{textAlign: 'center', mb:2, cursor: 'default'}}>
                            <p>Don&apos;t have account ? <Link onClick={() =>{history.replace('/signup')}} variant="body2" sx={{textDecoration:"none", cursor: 'pointer'}} >Sign-Up</Link></p>
                        </Grid>
                </form>
            </Grid>
        </Box>
    </>
    )
}
export default LoginComponent;