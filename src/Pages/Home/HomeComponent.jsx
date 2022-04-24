import React,{ useEffect, useState, useRef } from 'react';
import {  AppBar, MenuItem, Menu,Card, Badge, styled, Toolbar, IconButton, alpha, InputBase, ImageListItem, ImageList, Grid, Box, Typography, Button,  CardActions } from '@mui/material';
import {  Search, ShoppingCart, AccountCircle } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const SearchDiv = styled('div')(({ theme }) => ({  
  
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


const ProductComponent = ({ DataBase })=>{

  const [saved, setSaved]= useState([]);
  const [searches, setSearch] = useState('');
  const [anchorEl, setAnchorEl] =useState(null);
  const [products, setProduct] = useState([]);
  const history = useHistory();
  const FatchRef = useRef();
  const localToken = localStorage.getItem('token');
  const decodedToken = jwt.decode(localToken);
  const user = decodedToken.user;

  useEffect(()=>{
        
    if(decodedToken===null){
        history.push('/');
        alert("Session Timeout Please Login Again...");
    }else{
            if(decodedToken.exp*1000<=Date.now()){
            history.push('/');
            }
        }
    },[decodedToken,history])

  useEffect( () => { 
    FatchRef.current();
    },[])

  const Fatch = async() => {
  let response = await axios.get(`${DataBase}/product/getproduct`,
  {
    headers: { token:localToken }
  })
  setProduct(response.data);
            
  let responseUsers = await axios.get(`${DataBase}/users/getuser/${user._id}`,
  {
      headers:{ token:localToken }
  })
  setSaved(responseUsers.data.savedProduct);
}
  
FatchRef.current = Fatch;

//-------------------------------* SAVE AND REMOVE SAVE POST FUNCTIONS *-------------------------------//

const SaveProduct = (async (productId)=>{
  await axios.put(`${DataBase}/users/saveproduct/${user._id}`,
  {
    savedProduct:productId
  })
  Fatch();
})

const DeleteSavedProduct = (async (productId)=>{
  await axios.put(`${DataBase}/users/deletesavedproduct/${user._id}`,
  {
    savedProduct:productId
  })
  Fatch();
})

const handleMenu = (event) => {
  setAnchorEl(event.currentTarget)
};

const handleClose = () => {
  setAnchorEl(null);
};

const home = ()=>{
  history.push('/home');
}

const profile = ()=>{
  history.push('/profile');
}

const settings = ()=>{
  history.push('/settings');
}

const logout = ()=>{
  localStorage.removeItem('token');
  history.push('/');
  alert('You have been logged out');
}

return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            MOBI SHOP
          </Typography>
          <SearchDiv>
              <SearchIconWrapper>
                <Search />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e)=>{setSearch(e.currentTarget.value.toLowerCase())}}
              />
          </SearchDiv>
          &nbsp;
          <Badge badgeContent={saved.length} color="error">
            <ShoppingCart onClick={()=>{history.push('/cart');}}/>
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
                sx={{opacity: 0.98}}
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
                  <Typography sx={{  display: 'flex',color:'primary', justifyContent: 'center', m:1, fontSize:'1.2rem', fontWeight:'bold' }}>Hi {user.first_name}!</Typography>
                    <MenuItem sx={{width:'170px', display: 'flex', justifyContent: 'center' }} onClick ={home}>Home</MenuItem>
                    <MenuItem sx={{ display: 'flex', justifyContent: 'center', width:'170px'}} onClick ={profile}>Profile</MenuItem>
                    <MenuItem sx={{ display: 'flex', justifyContent: 'center'}} onClick ={settings}>Settings</MenuItem>
                    <MenuItem sx={{ display: 'flex', justifyContent: 'center'}}  onClick={logout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
        </Toolbar>
      </AppBar>
      <Grid container spacing={1} sx={{mt:2, justifyContent: 'center'}}>
        {products.filter((search)=>{
          if(searches===""){
            return search
          }else if(search.productName.toLowerCase().includes(searches) || search.processor.toLowerCase().includes(searches)){    
            return search
          } return false;
        }).map(product => (
          <Grid key={product._id}>
            <Grid item key={product._id}>
                <Card sx={{ width:'305px',height:'auto', ml:2.3, mt:1, borderRadius:'10px', boxShadow: '0px 0px 15px -6px rgba(0, 0, 0, 0.75)'}}>
                  <Typography style={{ fontSize: '0.9rem', fontWeight:'500', display: 'flex', justifyContent: 'center', marginTop:'15px', textAlign:"center"}}>
                        {product.productName}
                  </Typography>
                  <Box>
                    <ImageList sx={{display: 'flex', justifyContent: 'center',m:2}}>
                      <ImageListItem key={product.id}>
                        <img src={product.file}
                          alt = ""
                          loading="lazy"
                          style={{maxWidth: '100%', minHeight: '145px', maxHeight: '180px'}}
                        />
                      </ImageListItem>
                    </ImageList>
                  </Box>
                  <CardActions sx={{disply:'flax', justifyContent: 'center', mt:'-12px'}}>
                    {
                      saved?.includes(product._id)
                    ?
                      <Button 
                        variant="outlined" 
                        size="small" 
                        sx={{border:'2rem', borderRadius:'10px'}} 
                        onClick={()=>{DeleteSavedProduct(product._id)}}
                      >
                        REMOVE
                      </Button>
                    :
                      <Button 
                        variant="outlined" 
                        size="small" 
                        sx={{border:'2rem', borderRadius:'10px'}} 
                        onClick={()=>{SaveProduct(product._id)}}
                      >
                        ADD TO CART
                      </Button>

                    }
                  </CardActions>
                </Card>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ProductComponent;