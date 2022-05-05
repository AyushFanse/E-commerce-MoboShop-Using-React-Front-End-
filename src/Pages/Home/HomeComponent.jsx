import React,{ useEffect, useState, useRef } from 'react';
import { Grid, Box } from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar';
import CardItems from '../../Components/CardData/CardItems';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const ProductComponent = ({ DataBase })=>{

  const [saved, setSaved]= useState([]);
  const [searches, setSearch] = useState('');
  const [products, setProduct] = useState([]);
  const [changed, setChange] = useState('');
  const FatchRef = useRef();
  const localToken = localStorage.getItem('token');
  const decodedToken = jwt.decode(localToken);
  const user = decodedToken?.user;


  useEffect( () => { 
    FatchRef.current();
    },[changed])

  const Fatch = async() => {
    let response = await axios.get(`${DataBase}/product/getproduct`,
    {
      headers: { token:localToken }
    })
    setProduct(response.data.sort((a,b)=>{ return cal(a.createdAt)>cal(b.createdAt) ? 1 : -1 }));

    if(user){
      let responseUsers = await axios.get(`${DataBase}/users/getuser/${user?._id}`,
      {
          headers:{ token:localToken }
      })
      setSaved(responseUsers.data.savedProduct);
    }
    setChange('');
}
  
FatchRef.current = Fatch;

const cal = (date)=>{
  let DateNow = new Date(Date.now())
  return DateNow-date;
}

return (
    <Box>
      <Navbar saved={saved} page={'Moboshop'} search={setSearch} />
      <Grid container id='HomeCont' >
        {products.filter((search)=>{
          if(searches===""){
            return search
          }else if(search.productName.toLowerCase().includes(searches) || search.processor.toLowerCase().includes(searches)){    
            return search
          } return false;
        }).map(product => (
            <CardItems product={product} setChange={setChange} DataBase={DataBase} saved={saved} item key={product._id}/>
        ))}
      </Grid>
    </Box>
  )
}

export default ProductComponent;