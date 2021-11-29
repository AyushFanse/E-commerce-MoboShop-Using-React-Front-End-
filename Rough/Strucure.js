import {Component} from 'react';
// import Stucture from './App';
// import Brand from './Brand';
// import Cart  from './Cart';
import './bootstrap.css';
import './style.css';
import {Link} from "react-router-dom";


let supPop = document.querySelector("sup");
let cartContainer = document.querySelector('.cartDetails');
// let itemQty = document.querySelector(".qty");

let cartSuper = localStorage.getItem("cartSuper") ? JSON.parse(localStorage.getItem("cartSuper")) :[];
const nameOfTheProduct = name => cartSuper.indexOf(cartSuper.find(n=>n.name===name));


class Strucure extends Component {

popCount=()=>{
    
    supPop.innerHTML ="";
    cartSuper.reduce((accu,itemNum)=>accu+=itemNum.qty,0)>0 ? supPop.append(cartSuper.reduce((accu,itemNum)=>accu+=itemNum.qty,0)) : supPop.append(0);
    
};

Open=()=>{
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

Close=()=>{
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}




render() { 
        return (
    <>
    <div className="w3-sidebar w3-bar-block w3-border-right" id="mySidebar">
        <button onClick={this.Close} className="w3-bar-item w3-large d-flex justify-content-center" id="close"><i className="fas fa-angle-double-left"> Close</i></button>
        <Link to=""className="row d-flex m-3 justify-content-center btn btn-warning" id="patch">
            <div className="col">
                <div className=" d-flex justify-content-center m-2"><img src="a.png" alt="Avatar" className="row avatar"/></div>
                <div className=" d-flex justify-content-center" id="bubbleLog"><span>login</span></div>
            </div>
        </Link>
        <Link to="/" className=" m-3 d-flex justify-content-center" id="bubble"><span>Home</span></Link>
        <Link to="/Brand" className="m-3 d-flex justify-content-center" id="bubble"><span>Brand</span></Link>
        <Link to="/Cart" href="" className="m-3 d-flex justify-content-center" id="bubble" ><span>Cart</span></Link>
      </div>
      <div className="w3-overlay" onClick={this.Close} id="myOverlay"></div>

    <nav className="row navbar-nav">
        <div className="row navbar-main">
            <div className="col-md-4 p-2">
                <div className="row">
                    <div className="col-md-4 p-1 d-flex justify-content-center">
                        <img src="a.png" alt="Avatar" className="avatar m-2" onClick={this.Open}/>
                    </div>
                    <Link to="/" className="col-md-6 m nav-link shop">
                        <div className="company">
                            <span id="F">F</span><span id="A">A</span><span id="N">N</span><span id="S">S</span><span id="E">E</span> <span id="s">S</span><span id="H">h</span><span id="O">o</span><span id="P">p</span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="col-md-4 p-1 d-flex justify-content-center nav-middel">
                <Link to="/" className="p-3 nav-link home">
                    <h3 className="border-bottom"><i className="fas fa-home"></i></h3>
                </Link>
                <Link to="/Brand" className="p-3 nav-link text">
                    <h3 className="border-bottom" >B<span id="A">r</span>ands</h3>
                </Link>
                <Link to="/Cart" className="p-3 nav-link home">
                    <h3 className="border-bottom"><i className="fab fa-opencart"></i><sup id="sup"></sup></h3>
                </Link>
            </div>
            <div className="col-md-4 d-flex justify-content-center p-4">
                <div className="">
                    <input type="text" className="form-control p-3" placeholder="Search" id="searchData"/>
                </div>
                <div>
                    <button type="submit" className="btn btn-warning btn-outline-dark" id="searchBtn" >
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>
    </>
)}}




export default Strucure;