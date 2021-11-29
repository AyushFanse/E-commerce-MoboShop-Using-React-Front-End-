import React from "react";
import ReactDOM from "react-dom";
import JSONDATA from './Products.json';

function ViewDetails(props){
    return (
        <>
        {console.log(JSONDATA[props])}
        {JSONDATA[props]}
        {/* <div className="row displayItoms">
            <div className="col-md-6 d-flex justify-content-center">
                <a className="imgBack d-flex justify-content-center" href={"https://fanse-online-shop.netlify.app/" + JSONDATA[props.id].image}>
                    <img className="p-3" id="img" src={JSONDATA[props.id].image} alt="img" />
                </a>
            </div>
            <div className="col-md-5" id="Details">
                <div className="p-1 fontSize1">{JSONDATA[props.id].name}</div>
                <p className="p-1"><span id="price"><b>Price:</b><span id="priceVal"> ₹{JSONDATA[props.id].price}.00</span></span></p>
                <p className="row p-1" id="rom">
                    <span className="col-md-4 d-flex justify-content-start">RAM:{JSONDATA[props.id].ram} GB</span> 
                    <span className="col-md-8 d-flex justify-content-start">ROM:{JSONDATA[props.id].rom} GB</span>
                </p>
                <p className="p-1" id="processor">Processor: {JSONDATA[props.id].processor}</p>
                <p className="p-1" id="battry">Battry: {JSONDATA[props.id].battery} mAh</p>
                <div className="d-grid gap-2 d-md-block">
                    <button className="btn btn-warning btn-outline-dark m-2 addToCart" type="button">Add to Cart</button>
                    <button className="btn btn-dark btn-outline-warning m-2" type="button">Buy Now</button>
                </div>
            </div>
        </div> */}
    </>
)}
            



export default ViewDetails;