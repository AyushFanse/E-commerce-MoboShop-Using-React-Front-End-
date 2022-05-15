import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Alert, Stack, IconButton, Button, Link, Grid, TextField, FormControl, InputLabel, CircularProgress, Input, InputAdornment, Box } from '@mui/material';
import { Visibility, AccountCircle, VisibilityOff, ManageAccounts, LockTwoTone } from '@mui/icons-material';
import './auth.css';
import { TabTitle } from '../../Components/Common/CommonFun';


const LoginComponent = ({ DataBase }, props) => {

    const history = useHistory();
    const contactForm = useRef();
    const [loading, setLoading] = useState(false);
    const [Worning, setWorning] = useState('');
    const [showPassword, setShowPassword] = useState('');
    TabTitle(`MOBO SHOP | Login`)

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
            if (data.email.value && data.password.value) {
                let response = await axios.post(`${DataBase}/register/login`, {
                    email: data.email.value,
                    password: data.password.value
                })

                if (response.status === 200) {
                    localStorage.setItem('token', response.data.userToken);
                    history.replace('/');
                }

                if (response.status === 400) {
                    setWorning({ status: 'error', msg: response.data.msg })
                }
            } else {
                setWorning({ status: 'error', msg: 'Please fill all the details..!!!' });
            }
        } catch (err) {

            if (!err.response) {
                setWorning({ status: 'error', msg: "Your Are offline" })
                setLoading(false)
                return;
            }

            setWorning({ status: 'error', msg: err.response.data.msg });
            setLoading(false)
        }
        setLoading(false)
    }


    return (
        <>
            <a href='https://moboshopadmin.netlify.app' target='_blank' rel="noopener noreferrer" style={{ position: 'absolute', right: 40, height: '10px' }}>
                <Button style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', textUnderlinePosition: 'under', textTransform: 'capitalize' }}><ManageAccounts style={{ color: '#1976d2' }} />Admin Login</Button>
            </a>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid style={{ padding: "20px", background: '#c8e4fb', borderRadius: '5px', borderColor: 'primary', margin: "100px auto", boxShadow: '0px 0px 15px -6px rgba(0, 0, 0, 0.75)' }} sx={{ borderBottom: 5, borderColor: 'primary.main' }}>
                    <h2 style={{ textAlign: 'center', cursor: 'default', fontWeight: 600, display: 'flex', justifyContent: 'space-evenly', padding: '0px 100px' }}>
                        <LockTwoTone style={{ fontSize: "2rem", marginTop: '-3px' }} />
                        Login
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
                    <br />
                    <form ref={contactForm} onSubmit={(e) => handleSubmit(e)}>
                        <Box sx={{ mt: -2, '& .MuiTextField-root': { m: 1.8, width: 293 } }}>
                            <TextField
                                id="input-with-icon-textfield"
                                label="Email"
                                name="email"
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
                        <br />
                        <Grid>
                            <FormControl sx={{ m: 1.8 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    sx={{ width: 293 }}
                                    name="password"
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
                        </Grid>
                        <Grid sx={{ textAlign: 'center' }}>
                            <Button sx={{ mt: 4 }} type="submit" variant="contained" disableElevation >
                                Login
                            </Button>
                            {loading && (<CircularProgress size={24} id='CircularProgress' />)}
                        </Grid>
                        <Grid sx={{ textAlign: 'center', mb: 2, cursor: 'default' }}>
                            <p>Don&apos;t have account ? <Link onClick={() => { history.replace('/signup') }} variant="body2" sx={{ textDecoration: "none", cursor: 'pointer' }} >Sign-up</Link></p>
                        </Grid>
                    </form>
                </Grid>
            </Box>
        </>
    )
}

export default LoginComponent;