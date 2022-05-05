<<<<<<< HEAD
import React from 'react';
import { Card, ImageListItem, ImageList, Grid, Box, Typography, Button,  CardActions } from '@mui/material';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const CardItems = ({ product, DataBase, saved, setChange }) => {
    const history = useHistory();
    const localToken = localStorage.getItem('token');
    const decodedToken = jwt.decode(localToken);
    const user = decodedToken?.user;
    
//-------------------------------* SAVE AND REMOVE SAVE POST FUNCTIONS *-------------------------------//

const SaveProduct = (async (productId)=>{  
    setChange('changed')

    if(decodedToken===null){
        history.push('/login');
    }else{
            if(decodedToken.exp*1000<=Date.now()){
                history.push('/login');
                alert("Session Timeout Please Login Again...");
            }else{
                await axios.put(`${DataBase}/users/saveproduct/${user._id}`,
                {
                  savedProduct:productId
                })
            }
        }     
  })
  
  const DeleteSavedProduct = (async (productId)=>{
    setChange('changed')
    
    if(decodedToken===null){
        history.push('/login');
    }else{
            if(decodedToken.exp*1000<=Date.now()){
                history.push('/login');
                alert("Session Timeout Please Login Again...");
            }else{
                await axios.put(`${DataBase}/users/deletesavedproduct/${user._id}`,
                {
                  savedProduct:productId
                })
            }
        }     
  })
  
    return (
        <>
            <Grid id='homeCardOut'>
                <Card id='homeCard'>
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
        </>
    );
}

=======
import React from 'react';
import { Card, ImageListItem, ImageList, Grid, Box, Typography, Button,  CardActions } from '@mui/material';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const CardItems = ({ product, DataBase, saved, setChange }) => {
    const history = useHistory();
    const localToken = localStorage.getItem('token');
    const decodedToken = jwt.decode(localToken);
    const user = decodedToken?.user;
    
//-------------------------------* SAVE AND REMOVE SAVE POST FUNCTIONS *-------------------------------//

const SaveProduct = (async (productId)=>{  
    setChange('changed')

    if(decodedToken===null){
        history.push('/login');
    }else{
            if(decodedToken.exp*1000<=Date.now()){
                history.push('/login');
                alert("Session Timeout Please Login Again...");
            }else{
                await axios.put(`${DataBase}/users/saveproduct/${user._id}`,
                {
                  savedProduct:productId
                })
            }
        }     
  })
  
  const DeleteSavedProduct = (async (productId)=>{
    setChange('changed')
    
    if(decodedToken===null){
        history.push('/login');
    }else{
            if(decodedToken.exp*1000<=Date.now()){
                history.push('/login');
                alert("Session Timeout Please Login Again...");
            }else{
                await axios.put(`${DataBase}/users/deletesavedproduct/${user._id}`,
                {
                  savedProduct:productId
                })
            }
        }     
  })
  
    return (
        <>
            <Grid id='homeCardOut'>
                <Card id='homeCard'>
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
        </>
    );
}

>>>>>>> 92347de19b2dffdddb9377a24bd634ef5d0f91a2
export default CardItems;