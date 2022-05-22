import { Card, ImageListItem, ImageList, Grid, Box, Typography, Button, CardActions } from '@mui/material';
import { RemoveShoppingCart, AddShoppingCart } from '@mui/icons-material';
import { SaveProduct, DeleteSavedProduct } from '../Common/CommonFun';
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import React from 'react';

const CardItems = ({ product, DataBase, saved, Change }) => {

    const localToken = localStorage.getItem('token');
    const decodedToken = jwt.decode(localToken);
    const history = useHistory();

    const Save = ((P, U, L) => {

        if (decodedToken === null) {
            history.push('/login');
        } else {
            if (decodedToken.exp * 1000 <= Date.now()) {
                localStorage.removeItem('token');
                alert("Session Timeout Please Login Again...");
                history.push('/login');
            } else {
                Change('Changed');
                SaveProduct(P, U, L)
            }
        }
    })

    const Unsave = ((P, U, L) => {

        if (decodedToken === null) {
            history.push('/login');
        } else {
            if (decodedToken.exp * 1000 <= Date.now()) {
                localStorage.removeItem('token');
                alert("Session Timeout Please Login Again...");
                history.push('/login');
            } else {
                Change('Changed');
                DeleteSavedProduct(P, U, L)
            }
        }
    })

    return (
        <>
            <Grid id='homeCardOut'>
                <Card id='homeCard'>
                    <Typography style={{ fontFamily: 'Montserrat', fontSize: '0.86rem', fontWeight: '600', display: 'flex', justifyContent: 'center', marginTop: '15px', textAlign: "center" }}>
                        {product.productName}
                    </Typography>
                    <Box>
                        <ImageList sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
                            <ImageListItem key={product.id}>
                                <img src={product.file}
                                    alt=""
                                    loading="lazy"
                                    style={{ maxWidth: '100%', minHeight: '145px', maxHeight: '180px' }}
                                />
                            </ImageListItem>
                        </ImageList>
                    </Box>
                    <CardActions sx={{ disply: 'flax', justifyContent: 'space-evenly', mt: '-12px' }}>
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{ border: '1px solid #fff', borderBottom: '1px solid var(--theam)', borderRadius: '10px' }}
                            onClick={(e) => {
                                history.push(`/product/${product._id}`)
                            }}
                        >
                            View
                        </Button>
                        {
                            saved.includes(product._id)
                                ?
                                <Button
                                    variant="outlined"
                                    size="small"
                                    style={{ border: '1px solid #fff', borderBottom: '1px solid  var(--cl)', borderRadius: '10px' }}
                                    onClick={() => { Unsave(product._id, decodedToken.user._id, DataBase) }}
                                >
                                    <RemoveShoppingCart sx={{ color: 'var(--cl)' }} />
                                </Button>
                                :
                                <Button
                                    variant="outlined"
                                    size="small"
                                    sx={{ border: '1px solid #fff', borderBottom: '1px solid var(--theam)', borderRadius: '10px' }}
                                    onClick={() => { decodedToken ? Save(product._id, decodedToken.user._id, DataBase) : history.push('/login') }}
                                >
                                    <AddShoppingCart />
                                </Button>
                        }
                    </CardActions>
                </Card>
            </Grid>
        </>
    );
}

export default CardItems;