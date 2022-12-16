import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import {
    Alert,
    Stack,
    IconButton,
    Button,
    Grid,
    FormControl,
    InputLabel,
    CircularProgress,
    Input,
    InputAdornment,
    Box
} from '@mui/material';
import { Visibility, VisibilityOff, Password, KeyboardBackspace } from '@mui/icons-material';
import jwt from 'jsonwebtoken';
import { TabTitle } from '../../Components/Common/CommonFun';
import './auth.css';

const Reset = ({ DataBase }) => {
    //-------------------------------* USE-STATE METHODS *-------------------------------//

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState('');
    const [Worning, setWorning] = useState('');
    const history = useHistory();
    const { token } = useParams();
    const Expire = jwt.decode(token);
    const userId = Expire.user.id;
    const contactForm = useRef();
    TabTitle(`MOBO SHOP | Reset Password`)

    useEffect(() => {
        if (Expire.exp * 1000 <= Date.now()) {
            alert("The Link is expired");
            history.push('/');
        }
    },[])

    //-------------------------------* PASSWORD VISIBILITY *-------------------------------//
    const handleClickShowPassword = (e) => {
        setShowPassword(e.currentTarget);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
        setShowPassword('');
    };

    const handleClickShowConfirmPassword = (e) => {
        setShowConfirmPassword(e.currentTarget);
    };

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
        setShowConfirmPassword('');
    };

    //-------------------------------* LOGIN PART *-------------------------------//
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = contactForm.current;

        try {
            setLoading(true);


            if (data.confirm_password.value && data.password.value) {

                if (data.confirm_password.value !== data.password.value) {
                    setWorning({ status: 'error', msg: "Password dose not match" });
                    setLoading(false)
                    setTimeout(() => {
                        setWorning('');
                    }, 7000);
                    return;
                }

                let response = await axios.patch(`${DataBase}/users/updatepassword/${userId}`, {
                    password: data.password.value
                });


                setWorning(response.data);

                if (response.status === 200) {
                    history.push('/');
                }
            } else {
                setWorning({ status: 'error', msg: 'Please fill all the details..!!!' });
            }
        } catch (err) {

            if (!err.response) {
                setWorning({ status: 'error', msg: "Your Are offline" })
                setLoading(false)
                setTimeout(() => {
                    setWorning('');
                }, 7000);
                return;
            }
            setWorning({ status: 'error', msg: err.response.data.msg });
            setLoading(false)
        }
        setLoading(false)
        setTimeout(() => {
            setWorning('');
        }, 7000);
    };
    
    return (
        <>
            <IconButton onClick={() => { history.push('/login') }} edge="start" color="inherit" aria-label="menu" sx={{ ml: 2 }}>
                <KeyboardBackspace />
            </IconButton>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid style={{ padding: "20px", width: '350px', background: '#c8e4fb', borderRadius: '5px', borderColor: 'primary', margin: "100px auto", boxShadow: '0px 0px 15px -6px rgba(0, 0, 0, 0.75)' }} sx={{ borderBottom: 5, borderColor: 'primary.main' }}>
                    <h5 style={{ textAlign: 'center', cursor: 'default', fontWeight: 600, display: 'flex', justifyContent: 'space-evenly', padding: '0px 10px' }}>
                        <Password style={{ fontSize: "1.8rem", marginTop: '-3px' }} /> Reset Password
                    </h5>
                    {Worning.status === 'error' ? (
                        <Stack sx={{ width: '100%' }} spacing={1}>
                            <Alert severity="error">
                                {Worning.msg}
                            </Alert>
                        </Stack>
                    ) : null}
                    <br />
                    <form ref={contactForm} onSubmit={(e) => handleSubmit(e)} >
                        <Grid >
                            <FormControl
                                className="standard"
                                sx={{ m: 1, pl: 2, pr: 2, width: '25ch' }}
                                variant="standard"
                            >
                                <InputLabel
                                    id="title"
                                    style={{ marginLeft: '15px' }}
                                    focused
                                    htmlFor="standard-adornment-password"
                                >
                                    Password
                                </InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff id="iconsVisibilityOff" />
                                                ) : (
                                                    <Visibility id="icons" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    required
                                />
                            </FormControl>
                            <FormControl
                                className="standard"
                                sx={{ m: 1, pl: 2, pr: 2, width: '25ch' }}
                                variant="standard"
                            >
                                <InputLabel
                                    id="title"
                                    style={{ marginLeft: '15px' }}
                                    focused
                                    htmlFor="standard-adornment-password"
                                >
                                    Confirm Password
                                </InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name='confirm_password'
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownConfirmPassword}
                                            >
                                                {showConfirmPassword ? (
                                                    <VisibilityOff id="iconsVisibilityOff" />
                                                ) : (
                                                    <Visibility id="icons" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    required
                                />
                            </FormControl>
                        </Grid>
                        <Grid sx={{ textAlign: 'center', marginTop: '20px' }}>
                            <Button id="button" type="submit" variant="contained" disableElevation>
                                Reset
                            </Button>
                            {loading && <CircularProgress size={24} id="CircularProgress" />}
                        </Grid>
                    </form>
                </Grid>
            </Box>
        </>
    );
};

export default Reset;
