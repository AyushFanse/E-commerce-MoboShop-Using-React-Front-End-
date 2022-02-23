import React from 'react';
import LoginComponent from './LoginComponent';
import {Route,BrowserRouter, Switch} from "react-router-dom";
import HomeComponent from './HomeComponent';
import CartComponent from './CartComponent';
import ProfileComponent from './ProfileComponent';
import SignupComponent from './Sign-upComponent';
import SettingsComponent from './SettingsComponent';

function Routes(){
    return(
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={LoginComponent}></Route>
                    <Route exact path="/signup" component={SignupComponent}></Route>
                    <Route exact path='/home' component={HomeComponent}></Route>
                    <Route exact path='/cart' component={CartComponent}></Route>
                    <Route exact path='/profile' component={ProfileComponent}></Route>
                    <Route exact path='/settings' component={SettingsComponent}></Route>
                </Switch>
            </BrowserRouter>
        </> 
    )
}

export default Routes;