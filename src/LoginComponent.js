import React from 'react';
import axios from 'axios';
import {IconButton,Button,Link,Grid,TextField,FormControl,InputLabel, Input,InputAdornment,Box} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';



const LoginComponent = (props) => {

const [email, setEmail] = React.useState('');
const [password,setPassword] = React.useState('');
const [showPassword,setShowPassword] = React.useState('');
    
const handleClickShowPassword = (e) => {
    setShowPassword(e.currentTarget);
};

const handleMouseDownPassword = (event) => {
event.preventDefault();
setShowPassword('');
};

const handleSubmit = async (e) => {

e.preventDefault();
    try{
        var response = await axios.post('https://e-commerce-mobo-website.herokuapp.com/register/login', {
            password: password.value,
            email: email.value
        })
        if(response.data){
            await localStorage.setItem('token', response.data);
            props.history.push('/home');
        }
    } catch (err) {
        alert('Please Enter the Valide Data..!!!');
        console.warn(err);
    }
}
        return (
            <>
            <Box sx={{display: 'flex', justifyContent: 'center', mt:10}}>
                <Grid style={{padding:"20px", background:'#c8e4fb',  borderRadius:'16px', borderColor:'primary'}} sx={{border:2, borderColor: 'primary.main'}}>
                    <h2 style={{textAlign: 'center'}}>Login</h2>
                    <br/>
                    <form onSubmit={(e) => handleSubmit(e)}>
                            <Grid>
                            <FormControl sx={{ m: 1, width: '25ch'}}>
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
                                </FormControl>
                            </Grid>
                            <br/>
                            <Grid>
                                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={showPassword? 'text' : 'password'}
                                        value={props.password}
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
                            <Grid sx={{textAlign: 'center', mb:2, cursor: 'pointer'}}>
                                <p>Don&apos;t have account ? <Link onClick={() =>{props.history.push('/signin')}} variant="body2">Sign-In</Link></p>
                            </Grid>
                    </form>
                    </Grid>
                </Box>
            </>
        )
        
    }
export default LoginComponent;