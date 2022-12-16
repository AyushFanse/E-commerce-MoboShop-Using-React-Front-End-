import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
    Alert,
    Stack,
    Button,
    Grid,
    FormControl,
    InputLabel,
    CircularProgress,
    Input,
    Box,
    IconButton
} from '@mui/material';
import { AccountCircle, KeyboardBackspace } from '@mui/icons-material';
import { TabTitle } from '../../Components/Common/CommonFun';
import './auth.css';

const Forgot = ({ DataBase }) => {
    //-------------------------------* USE-STATE METHODS *-------------------------------//

    const [loading, setLoading] = useState(false);
    const [Worning, setWorning] = useState('');
    const [link, setLink] = useState('');
    const history = useHistory();
    const contactForm = useRef();
    TabTitle(`MOBO SHOP | Forget Password`)

    //-------------------------------* LOGIN PART *-------------------------------//
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = contactForm.current;

        try {
            setLoading(true);
            if (data.email.value) {
                let response = await axios.post(`${DataBase}/register/forgotpassword`, {
                    email: data.email.value
                });

                setWorning(response.data);

                if (response.status === 200) {
                    setLink(response.data.msg)
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
                    {
                        link === ''
                            ?
                            (
                                <>
                                    <h5 style={{ textAlign: 'center', cursor: 'default', fontWeight: 600, display: 'flex', justifyContent: 'space-evenly', padding: '0px 10px' }}>
                                        <AccountCircle style={{ fontSize: "1.8rem", marginTop: '-3px' }} /> Forgot Password
                                    </h5>
                                    {
                                        Worning.status === 'error'
                                            ?
                                            (
                                                <Stack sx={{ width: '100%' }} spacing={2}>
                                                    <Alert variant="outlined" severity="error">
                                                        {Worning.msg}
                                                    </Alert>
                                                </Stack>
                                            )
                                            :
                                            null
                                    }
                                    <br />
                                    <form ref={contactForm} onSubmit={(e) => handleSubmit(e)}>
                                        <Grid>
                                            <FormControl sx={{ m: 1, pl: 2, pr: 2, width: '25ch' }}>
                                                <InputLabel sx={{ ml: 0.2 }} id="title" focused htmlFor="input-with-icon-textfield">
                                                    Email
                                                </InputLabel>
                                                <Input
                                                    id="input-with-icon-textfield"
                                                    name="email"
                                                    label="Email"
                                                    aria-describedby="component-warning-text"
                                                    required
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid sx={{ textAlign: 'center', marginTop: '20px' }}>
                                            <Button id="button" type="submit" variant="contained" disableElevation>
                                                Send
                                            </Button>
                                            {loading && <CircularProgress size={24} id="CircularProgress" />}
                                        </Grid>
                                    </form>
                                </>
                            )
                            :
                            (
                                <>
                                    <h5 style={{ textAlign: 'center' }} id="heading">
                                        {link}
                                    </h5>
                                </>
                            )
                    }
                </Grid>
            </Box>
        </>
    );
};

export default Forgot;
