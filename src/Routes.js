import React from 'react';
import { Route, BrowserRouter, Switch } from "react-router-dom";

//-------------------------------* PAGES *-------------------------------//
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import Profile from './Pages/Profile/Profile';
import EditUser from './Pages/Profile/EditUser';
import Error from './Pages/Error/Error';
import ViewPro from './Pages/ViewProduct/ViewPro';



const Routes = () => {

    const DataBase = 'https://e-commerce-mobo-website.herokuapp.com';

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/'><Home DataBase={DataBase} /></Route>
                <Route exact path="/login"><Login DataBase={DataBase} /></Route>
                <Route exact path="/signup"><Signup DataBase={DataBase} /></Route>
                <Route exact path='/cart' ><Cart DataBase={DataBase} /></Route>
                <Route exact path='/product/:productId' ><ViewPro DataBase={DataBase} /></Route>
                <Route exact path='/profile' ><Profile DataBase={DataBase} /></Route>
                <Route exact path='/profile/:userId' ><EditUser DataBase={DataBase} /></Route>
                <Route exact path='*' ><Error /></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;