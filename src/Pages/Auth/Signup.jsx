import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Alert, Stack, IconButton, Button, Grid, TextField, FormControl, InputLabel, Input, Link, InputAdornment, CircularProgress, Box } from '@mui/material';
import { Visibility, KeyboardBackspace, VisibilityOff, HowToReg } from '@mui/icons-material';
import { TabTitle } from '../../Components/Common/CommonFun';

const LoginComponent = ({ DataBase }, props) => {


    const [showPassword, setShowPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [Worning, setWorning] = useState('');
    const history = useHistory();
    const contactForm = useRef();
    TabTitle(`MOBO SHOP | Sign-Up`)

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
        const data = contactForm.current;

        try {
            setLoading(true)
            if (data.first_name.value && data.last_name.value && data.username.value && data.email.value && data.address.value && data.number.value && data.password.value) {

                let response = await axios.post(`${DataBase}/register/registerUser`, {

                    first_name: data.first_name.value,
                    last_name: data.last_name.value,
                    username: data.username.value,
                    address: data.address.value,
                    number: data.number.value,
                    email: data.email.value,
                    password: data.password.value
                })

                if (response.status === 201) {
                    history.push('/login');
                    alert("You have successfully created your account...");
                }

                if (response.status === 400) {
                    setWorning({ status: 'error', msg: response.data.msg })
                }
            } else {
                setWorning({ status: 'error', msg: 'Please fill all the details..!!!' })
                setLoading(false);
            }
        } catch (err) {

            if (!err.response) {
                setWorning({ status: 'error', msg: "Your Are offline" })
                setLoading(false)
                return;
            }

            setWorning({ status: 'error', msg: err.response.data.msg });
            setLoading(false);
        }
        setLoading(false)
    }

    //-------------------------------* VALIDATION FUNCTIONS *-------------------------------//
    return (
        <>
            <IconButton onClick={() => { history.push('/login') }} edge="start" color="inherit" aria-label="menu" sx={{ ml: 2 }}>
                <KeyboardBackspace />
            </IconButton>
            <Box sx={{ '& .MuiTextField-root': { mt: 2 }, display: 'flex', justifyContent: 'center' }}>
                <Grid style={{ padding: "20px", background: '#c8e4fb', width: '377px', borderRadius: '5px', margin: "20px auto", boxShadow: '0px 0px 15px -6px rgba(0, 0, 0, 0.75)' }} sx={{ borderBottom: 5, borderColor: 'primary.main' }}>
                    <h2 style={{ alignItems: 'center', cursor: 'default', fontWeight: 600, display: 'flex', justifyContent: 'space-evenly', padding: '0px 100px' }}>
                        <HowToReg style={{ fontSize: "2rem", marginTop: '-3px' }} />
                        Signup
                    </h2>
                    {
                        Worning.status === 'error'
                            ?
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert variant="filled" severity="error">{Worning.msg}</Alert>
                            </Stack>
                            :
                            null
                    }
                    <form ref={contactForm} style={{ textAlign: 'center' }} onSubmit={(e) => handleSubmit(e)}>
                        <Box sx={{ '& .MuiTextField-root': { m: 1.8, width: '11.2ch' } }}>
                            <TextField
                                id="standard"
                                label="First-Name"
                                size="small"
                                variant="standard"
                                aria-required="true"
                                name="first_name"
                            />
                            <TextField
                                id="standard"
                                label="Last-Name"
                                size="small"
                                variant="standard"
                                name="last_name"
                            />
                        </Box>
                        <Box sx={{ mt: -2, '& .MuiTextField-root': { m: 1.8, width: 293 } }}>
                            <TextField
                                id="standard"
                                label="Username"
                                size="small"
                                variant="standard"
                                name="username"
                            />
                        </Box>
                        <Box sx={{ mt: -2, '& .MuiTextField-root': { m: 1.8, width: 293 } }}>
                            <TextField
                                id="standard"
                                label="Email"
                                size="small"
                                variant="standard"
                                name="email"
                            />
                        </Box>
                        <Box sx={{ mt: -2, '& .MuiTextField-root': { m: 1.8, width: 293 } }}>
                            <TextField
                                id="standard"
                                label="Number"
                                size="small"
                                variant="standard"
                                name="number"
                            />
                        </Box>
                        <FormControl sx={{ '& .MuiTextField-root': { m: 0 } }}>
                            <InputLabel htmlFor="standard-adornment-password" sx={{ ml: -1.7 }}>Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                size="small"
                                sx={{ width: 293 }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Box sx={{ '& .MuiTextField-root': { m: 1.8, width: 293 } }}>
                            <TextField
                                id="standard"
                                label="Address"
                                size="small"
                                variant="standard"
                                name="address"
                            />
                        </Box>
                        <Grid sx={{ textAlign: 'center' }}>
                            <Button sx={{ mt: 2 }} type="submit" variant="contained" disableElevation >
                                Create Account
                            </Button>
                            {loading && (<CircularProgress size={24} id='CircularProgress' />)}
                            <Grid sx={{ textAlign: 'center', mb: -2, cursor: 'default' }}>
                                <p>Already have account ? <Link onClick={() => { history.push('/login') }} variant="body2" sx={{ textDecoration: "none", cursor: 'pointer' }} >Login</Link></p>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Box>
        </>
    )
}

export default LoginComponent;