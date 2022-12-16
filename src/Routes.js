import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

//-------------------------------* PAGES *-------------------------------//
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import Forgot from "./Pages/Auth/Forgot";
import Reset from "./Pages/Auth/Reset";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import Profile from "./Pages/Profile/Profile";
import EditUser from "./Pages/Profile/EditUser";
import Error from "./Pages/Error/Error";
import ViewPro from "./Pages/ViewProduct/ViewPro";

const URL = "https://e-commerce-mobo-website.onrender.com";
// const URL = "http://localhost:3001";
const clientId =
  "666200109799-dq9eu8pisg3iuhibts2oktjhct7i1v9r.apps.googleusercontent.com";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Home DataBase={URL} />
        </Route>
        <Route exact path='/login'>
          <Login DataBase={URL} clientId={clientId} />
        </Route>
        <Route exact path='/signup'>
          <Signup DataBase={URL} />
        </Route>
        <Route exact path='/forgotpassword'>
          <Forgot DataBase={URL} />
        </Route>
        <Route exact path='/reset/:token'>
          <Reset DataBase={URL} />
        </Route>
        <Route exact path='/cart'>
          <Cart DataBase={URL} />
        </Route>
        <Route exact path='/product/:productId'>
          <ViewPro DataBase={URL} />
        </Route>
        <Route exact path='/profile'>
          <Profile DataBase={URL} />
        </Route>
        <Route exact path='/profile/:userId'>
          <EditUser DataBase={URL} />
        </Route>
        <Route exact path='*'>
          <Error />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
