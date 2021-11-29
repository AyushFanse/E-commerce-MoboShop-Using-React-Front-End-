import React from 'react';
import ViewDetails from './Details';
import JSONDATA from './Products.json';
import {Link} from "react-router-dom";





function Home(props){



return (
<>  
    <div className="row displayItoms">
        {JSONDATA.map((product) => (
            <div className="col-md-3" id="product">
            <div className="d-flex justify-content-center fontSize p-4">{product.name}</div> 
            <div className="p-3 d-flex justify-content-center dispImg bg-image hover-zoom"> 
                <a className="d-flex justify-content-center beforeDisplay" href={"https://fanse-online-shop.netlify.app/" + product.image}>
                    <img className="display" src={product.image} alt="img"/>
                </a> 
            </div> 
            <div className="p-4 d-flex justify-content-center"> 
                <Link to="/Details"><button className="btn btn-warning viewDetails" onClick={()=>{ var id = product.id; ViewDetails(id)}} type="button">View Details</button></Link>
            </div>
            </div>
        ))}
    </div>
</>
)
 }

 



 export default Home;
