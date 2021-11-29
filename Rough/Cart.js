import {Component} from 'react';
import {Route,BrowserRouter as Router, Switch, useParams, Link} from "react-router-dom";

let cartSuper = localStorage.getItem("cartSuper") ? JSON.parse(localStorage.getItem("cartSuper")) :[];
const nameOfTheProduct = name => cartSuper.indexOf(cartSuper.find(n=>n.name===name));

class Cart extends Component {

render() {
    return (
        <>
        <nav className="row navbar-nav">
        <Link to="/" className="p-1 nav-link home"><h2><a id="cartBack"><i className="fas fa-angle-double-left"></i></a></h2></Link>
            <div className="p-1 d-flex justify-content-center"><h2 className="myCart">My Cart</h2></div>
            <div className="d-flex justify-content-end" type="button" onclick="reset()"><span className="reset" id="reset">Reset All</span></div>
        </nav>
        </>
    )
}}


export default Cart;