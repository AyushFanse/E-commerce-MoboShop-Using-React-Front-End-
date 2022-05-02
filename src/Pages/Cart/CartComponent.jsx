import React, {useEffect, useState, useRef} from 'react';
import {Box, Button, Card, Table, ImageListItem, ImageList, TableCell, TableRow, TableBody, TableHead,  TableContainer, Grid, CardContent, Typography} from '@mui/material';
import Payment from '../../Components/Payment/Payment';
import { useHistory } from 'react-router-dom';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Navbar from '../../Components/Navbar/Navbar';

const CartComponent = ({ DataBase })=>{

    const fee = 40;
    const history = useHistory();
    const [saved, setSaved]= useState([]);
    const [products, setProduct] = useState([]);
    const [userQuanttity, setUserQuanttity] = useState(1);    
    const FatchRef = useRef();
    const formatter = new Intl.NumberFormat("en-US", 
        {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
        });
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
      

    const Fatch = (async()=>{
                var response = await axios.get(`${DataBase}/product/getproduct`,
                {
                    headers:{ token:localToken }
                })
        
                let createData = response.data;
                setProduct(createData);

                
                let responseUsers = await axios.get(`${DataBase}/users/getuser/${user._id}`,
                {
                    headers:{ token:localToken }
                })

                setSaved(responseUsers.data.savedProduct);
    })

    FatchRef.current = Fatch;

    const DeleteSavedProduct = (async (productId)=>{
        await axios.put(`${DataBase}/users/deletesavedproduct/${user._id}`,{
        savedProduct:productId
        })
        Fatch();
    })

return (
    <Box sx={{ flexGrow: 1}}>
        <Navbar page={'Cart'} />
        <Grid container  id='CartCont' >
            {products.filter((search)=>{
                if(saved.includes(search._id)){    
                return search
              }
              return null
            }).map((product)=>(
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
                        <CardContent sx={{ gridArea: 'header4', minWidth: 33.3, height:'auto',fontFamily: 'Montserrat'}}>
                            <Grid sx={{ml : 2}}>
                                <Typography variant="h6" component="div">
                                    {product.productName}
                                </Typography>
                                <Typography sx={{ mb: 0.5 }} color="text.secondary">
                                    Price: {formatter.format(product.price)}.00
                                </Typography>
                                <Typography sx={{ mb: 0.7 }} color="text.secondary">
                                    Ram: {product.ram}GB &nbsp; Rom: {product.rom}GB
                                </Typography>
                                <Typography sx={{ mb: 0.7 }} color="text.secondary">
                                    Processor: {product.processor}
                                </Typography>
                                <Typography sx={{ mb: 0.7 }} color="text.secondary" size="2px">
                                    Battery: {product.battery}mAH
                                </Typography>
                                <Typography sx={{ mb: 0.7 }} color="text.secondary" size="2px">
                                    Avaliable Quantity: {product.quanttity}
                                </Typography>
                            </Grid>
                        </CardContent>
                        <CardContent sx={{ gridArea: 'header3', minWidth: 200 }}>
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
                                                GST-Tax <span style={{fontSize:'10px', fontWeight: 800}}>(18% Inc.)</span>
                                            </TableCell>
                                            <TableCell align="right">{formatter.format((product.price*userQuanttity*18)/100)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Quantity
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button sx={{ minWidth:20, mb:-1, mt:-1}} onClick={()=>{setUserQuanttity(userQuanttity-1)}} disabled={userQuanttity<=1}>-</Button>
                                                    {userQuanttity}
                                                <Button sx={{ minWidth:20, mb:-1, mt:-1}} onClick={()=>{setUserQuanttity(userQuanttity+1)}} disabled={userQuanttity>=3}>+</Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Total
                                            </TableCell>
                                            <TableCell align="right">{formatter.format(product.price*userQuanttity+fee)}.00</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>                       
                        <CardContent>
                            <Grid sx={{textAlign: 'center'}}>
                                <Grid className="buyButtons">
                                    <DeleteForeverTwoToneIcon color="error" onClick={()=>{DeleteSavedProduct(product._id)}} sx={{verticalAlign: 'middle',ml:-3}} />
                                    <Payment product={product} userQuanttity={userQuanttity} DataBase={DataBase} user={user._id} />
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