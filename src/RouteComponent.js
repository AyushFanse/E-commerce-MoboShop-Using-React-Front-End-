import React from 'react';
import LoginComponent from './LoginComponent';
import {Route,BrowserRouter, Switch} from "react-router-dom";
import ProductComponent from './HomeComponent';
import CartComponent from './CartComponent';
import ProfileComponent from './ProfileComponent';
import SigninComponent from './Sign-inComponent';
import SettingsComponent from './SettingsComponent';

function HomeComponent(){
    return(
       <>
                <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={LoginComponent}></Route>
                    <Route exact path="/signin" component={SigninComponent}></Route>
                    <Route exact path='/home' component={ProductComponent}></Route>
                    <Route exact path='/cart' component={CartComponent}></Route>
                    <Route exact path='/profile' component={ProfileComponent}></Route>
                    <Route exact path='/settings' component={SettingsComponent}></Route>
                </Switch>
                </BrowserRouter>
       </> 
    )
}

export default HomeComponent;