import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Grid } from '@mui/material';
import { TabTitle } from '../../Components/Common/CommonFun';

const Error = (props) => {
    TabTitle(`MOBO SHOP | Error`)
    return (
        <>
            <Navbar page={'Error'} />
            <Grid container id='ErrorCont'>
                <img src="https://i.ibb.co/SJdXspD/pngegg-2.png" alt="" />
            </Grid>
        </>
    );
}

export default Error;