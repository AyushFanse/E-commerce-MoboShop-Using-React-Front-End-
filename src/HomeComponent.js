import React,{useEffect, useState} from 'react';
import {AppBar, Badge,Card, MenuItem, Menu, styled, alpha, ImageListItem, ImageList, InputBase, Grid, Box, Toolbar, Typography, Button, IconButton,  CardActions} from '@mui/material';
import SearchIcon  from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartTwoTone';
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: 'auto'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const CardDataInCenter = styled('div')(({ theme }) => ({
  
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',    
    [theme.breakpoints.down('lg')]: {
      width: '15ch'
    },    
    [theme.breakpoints.down('md')]: {
      width: '9ch'
    },
    [theme.breakpoints.down('sm')]: {
      width: '0px'
    }
  }
}));


const ProductComponent = (props)=>{

let[add, setAdd]= useState('');
let [anchorEl, setAnchorEl] =useState(null);
let [products, setProduct] = useState([]);
let [cart,setCart] = useState(0);
const localToken = localStorage.getItem('token');
var decodedToken = jwt.decode(localToken);


useEffect(async ()=>{

    if(decodedToken.exp*1000<=Date.now()){
    props.history.push('/');
  }else{
  var response = await axios.get('http://localhost:3001/product/getproduct',
  {
    headers: {
      token:localToken
    }
  })
  setAdd('ADD TO CART');
  setProduct(response.data);
  updateCart(response.data);
}},[])


const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
};

const handleClose = () => {
  setAnchorEl(null);
};

const updateProduct = async (id, userQuanttity)=>{
  
  if(decodedToken==null){
    props.history.push('/');
    alert("Session Timeout Please Login Again...");
  }else{
  if(decodedToken.exp*1000<=Date.now()){
    props.history.push('/');
  }else{
    var response = await axios.patch(`http://localhost:3001/product/updateproduct/${id}`,
    {
      userQuanttity: userQuanttity
    },
    {
    headers: {
      token:localToken
    }
  })
    var productsCopy = [...products];
    var index = productsCopy.findIndex(product => product.id === response.data._id);
    productsCopy[index] = response.data;
    
    setProduct(productsCopy);
    updateCart(productsCopy);
}}}

const profile = ()=>{
  props.history.push('/profile');
}

const settings = ()=>{
  props.history.push('/settings');
}

const updateCart = (cartProduct) => {
  var cart = cartProduct.reduce((acc,curValue)=>{
    return (curValue.userQuanttity)? acc +1 : acc
  },0)
  
  setCart(cart);
}

const logout = ()=>{
  localStorage.removeItem('token');
  props.history.push('/');
  alert('You have been logged out');
}

    return (
        <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6"  component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              MOBI-SHOPE
            </Typography>
            <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            &nbsp;
            <Badge badgeContent={cart} color="error">
              <ShoppingCartIcon onClick={()=>{props.history.push('/cart');}}/>
            </Badge>
              {(
                <div>
                  <IconButton 
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit">
                      <AccountCircle />
                  </IconButton>
                  <Menu id="menu"
                  sx={{opacity: 0.95}}
                        anchorEl={anchorEl}
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
                        onClick={handleClose}>
                    <Typography sx={{  display: 'flex',color:'primary', justifyContent: 'center', m:-1}}><h3>Hi {decodedToken.user.fname} !</h3></Typography>
                    <MenuItem sx={{ display: 'flex', justifyContent: 'center', width:'170px'}} onClick ={profile}>profile</MenuItem>
                    <MenuItem sx={{ display: 'flex', justifyContent: 'center'}} onClick ={settings}>Settings</MenuItem>
                    <MenuItem sx={{ display: 'flex', justifyContent: 'center'}}  onClick={logout}>Logout</MenuItem>
                  </Menu>
                </div>
              )}
          </Toolbar>
        </AppBar>
        <Grid container spacing={1} sx={{mt:2}}>
          {products.map(product => (
            <CardDataInCenter key={product._id}>
              <Grid item key={product._id}>
                  <Typography variant="h7" component="div" sx={{ display: 'flex', justifyContent: 'center', mt:'15px'}}>
                        {product.productName}
                  </Typography>
                  <Card sx={{ width:'305px',height:'250px', ml:2.3, mt:1, borderRadius:'10px',border:3, borderColor: 'primary.main'}}>
                    <Typography>
                    <ImageList sx={{display: 'flex', justifyContent: 'center',m:2}}>
                            <ImageListItem key={product.image}>
                            <img src={`${product.image}?w=248&fit=crop&auto=format`}
                                loading="lazy"
                                style={{maxWidth: '100%', minHeight: '145px', maxHeight: '180px'}}/>
                            </ImageListItem>
                        </ImageList>
                    </Typography>
                    <CardActions sx={{disply:'flax', justifyContent: 'center', mt:'-12px'}}>
                        <Button variant="outlined" size="small" sx={{border:1.7, borderRadius:'10px'}} onClick={()=>{updateProduct(product._id,++product.userQuanttity)}} disabled={product.userQuanttity>=1}>{add}</Button>
                    </CardActions>
                  </Card>
              </Grid>
            </CardDataInCenter>
          ))}
        </Grid>
      </Box>
    )
}

export default ProductComponent;