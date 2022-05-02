import React,{ useEffect, useState, useRef } from 'react';
import { Card, ImageListItem, ImageList, Grid, Box, Typography, Button,  CardActions } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const ProductComponent = ({ DataBase })=>{

  const [saved, setSaved]= useState([]);
  const [searches, setSearch] = useState('');
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
    setProduct(response.data.sort((a,b)=>{ return cal(a.createdAt)>cal(b.createdAt) ? 1 : -1 }));
              
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

const cal = (date)=>{
  let DateNow = new Date(Date.now())
  return DateNow-date;
}

return (
    <Box>
      <Navbar user={user} saved={saved} page={'Moboshop'} search={setSearch} />
      <Grid container spacing={1} id='HomeCont' >
        {products.filter((search)=>{
          if(searches===""){
            return search
          }else if(search.productName.toLowerCase().includes(searches) || search.processor.toLowerCase().includes(searches)){    
            return search
          } return false;
        }).map(product => (
            <Grid id='homeCardOut' item key={product._id}>
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
        ))}
      </Grid>
    </Box>
  )
}

export default ProductComponent;