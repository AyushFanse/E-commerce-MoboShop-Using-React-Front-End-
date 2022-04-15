import React, {useEffect, useState} from 'react';
import {Box, AppBar, Button, Card, Table, ImageListItem, ImageList, TableCell, TableRow, TableBody, TableHead,  TableContainer, Grid, CardContent, Toolbar, MenuItem, Menu, IconButton, Typography} from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Payment from './Components/Payment';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import axios from 'axios';
import jwt from 'jsonwebtoken';


const CartComponent = (props)=>{

const fee = 40;
const tax = 20;
const [anchorEl, setAnchorEl] =useState(null);
var [products, setProduct] = useState([]);
const localToken = localStorage.getItem('token');
var decodedToken = jwt.decode(localToken);
const DataBase = 'https://e-commerce-mobo-website.herokuapp.com/';
const formatter = new Intl.NumberFormat("en-US", 
{
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
});


useEffect( () =>{ Fatch() })

const Fatch = (async()=>{
    if(decodedToken==null){
        props.history.push('/');
        alert("Session Timeout Please Login Again...");
    }else{
            if(decodedToken.exp*1000<=Date.now()){
            props.history.push('/');
            }else{
            var response = await axios.get(`${DataBase}product/getproduct`,
            {
                headers:{ token:localToken }
            })
    
            let createData = response.data;
            Filter(createData);
        }
}})

const Filter = (filterData)=>{
    let createdData = [];
        createdData = filterData.filter(function(ele){
        return ele.userQuanttity!==0;
    })
    setProduct(createdData);
}

const updateProduct = (async (id, userQuanttity)=>{

    if(decodedToken==null){
      props.history.push('/');
      alert("Session Timeout Please Login Again...");
    }else{
        if(decodedToken.exp*1000<=Date.now()){
        props.history.push('/');
        }else{
        var response = await axios.patch(`${DataBase}product/updateproduct/${id}`,
        {
            userQuanttity: userQuanttity
        },
        {
        headers: { token:localToken }
        })
    var productsCopy = [...products];
    var index = productsCopy.findIndex(product => product.id === response.data._id);
    productsCopy[index] = response.data;

    Filter(productsCopy);
}}})

//--------------------* Navigation Tabs *--------------------//
const profile = ()=>{
    props.history.push('/profile');
}

const home = ()=>{
    props.history.push('/home');
};

const settings = ()=>{
    props.history.push('/settings');
}

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
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center'}}>
                    CART
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
                        sx={{opacity:0.95}}
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
                        <Typography sx={{  display: 'flex', justifyContent: 'center', m:-1}}><h3>Hi {decodedToken.user.first_name} !</h3></Typography>
                        <MenuItem sx={{width:'170px', display: 'flex', justifyContent: 'center' }} onClick ={home}>Home</MenuItem>
                        <MenuItem sx={{display: 'flex', justifyContent: 'center'}} onClick ={profile}>profile</MenuItem>
                        <MenuItem sx={{ display: 'flex', justifyContent: 'center'}} onClick ={settings}>Settings</MenuItem>
                        <MenuItem sx={{ display: 'flex', justifyContent: 'center'}} onClick={logout}>Logout</MenuItem>
                        
                    </Menu>
                </div>
                )}
            </Toolbar>
        </AppBar>
        <Grid container >
            {products.map((product)=>(
                <Grid key={product._id}>
                    <Card direction="row" variant="outlined" sx={{ m:1,ml:1.8, mt:4, gridTemplateColumns: 'repeat(3, 1fr)', width:'300px', gridTemplateRows: 'auto', gridTemplateAreas: `'header1 header2 header3'`,  borderRadius:'10px',border:3, borderColor: 'primary.main'}}>
                        <CardContent direction="col" >
                            <CardContent sx={{display: 'flex', justifyContent: 'center'}}>
                                <ImageList sx={{ maxWidth: '180px', minWidth: '100px', maxHeight: '280px', height:'100%', display: 'flex', mt:'-5px' , mb:'-2px'}}>
                                    <ImageListItem key={product.id}>
                                        <img src={product.file}
                                            alt = ""
                                            loading="lazy"
                                            style={{maxWidth: '100%', minHeight: '160px', maxHeight: '180px'}}/>
                                    </ImageListItem>
                                </ImageList>
                            </CardContent>
                        </CardContent>
                        <CardContent sx={{ gridArea: 'header2', minWidth: 33.3, height:'170px'}}>
                            <Grid sx={{ml : 2}}>
                                <Typography variant="h6" component="div">
                                    {product.productName}
                                </Typography>
                                <Typography sx={{ mb: 0.5 }} color="text.secondary">
                                    Price: {formatter.format(product.price)}.00
                                </Typography>
                                <Typography sx={{ mb: 0.7 }} variant="h7" component="div">
                                    Ram: {product.ram}GB &nbsp; Rom: {product.rom}GB
                                </Typography>
                                <Typography sx={{ mb: 0.7 }} variant="h7" component="div">
                                    Processor: {product.processor}
                                </Typography>
                                <Typography sx={{ mb: 0.7 }} variant="h7" component="div" size="2px">
                                    Battery:{product.battery}MHz
                                </Typography>
                                <Typography sx={{ mb: 0.7 }} variant="h7" component="div" size="2px">
                                    Avg.Quantity: {product.quanttity}
                                </Typography>
                            </Grid>
                        </CardContent>
                        <CardContent sx={{ gridArea: 'header3', minWidth:  200}}>
                            <TableContainer>
                                <Table sx={{ minWidth: 150 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell color="primary" >Details</TableCell>
                                            <TableCell align="right">Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Price
                                            </TableCell>
                                            <TableCell align="right">{formatter.format(product.price)}.00</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Delivery Fee
                                            </TableCell>
                                            <TableCell align="right">{formatter.format(fee)}.00</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                GST-Tax (18% Inc.)
                                            </TableCell>
                                            <TableCell align="right">{formatter.format((product.price*product.userQuanttity*18)/100)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Quantity
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button sx={{ minWidth:20, mb:-1, mt:-1}} onClick={()=>{updateProduct(product._id, --product.userQuanttity)}} disabled={product.userQuanttity<=0}>-</Button>
                                                    {product.userQuanttity}
                                                <Button sx={{ minWidth:20, mb:-1, mt:-1}} onClick={()=>{updateProduct(product._id, ++product.userQuanttity)}} disabled={product.userQuanttity>=product.quanttity}>+</Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Total
                                            </TableCell>
                                            <TableCell align="right">{formatter.format(product.price*product.userQuanttity+fee)}.00</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>                       
                        <CardContent>
                            <Grid sx={{textAlign: 'center'}}>
                                <Grid className="buyButtons">
                                    <DeleteForeverTwoToneIcon color="error" onClick={()=>{updateProduct(product._id, product.userQuanttity=0)}} sx={{verticalAlign: 'middle',ml:-3}} />
                                    <Payment product={product} />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            ))}

           
        </Grid>
    </Box>
    );
}

export default CartComponent;