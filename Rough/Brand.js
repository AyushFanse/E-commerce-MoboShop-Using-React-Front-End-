import {Component} from 'react';
import Strucure from './Strucure';


const brands = [
    {
        brandName:"Realme",
        icon:"icons/Realme.png",
    },
    {
        brandName:"Motorola",
        icon:"icons/Motorola.png",
    },
    {
        brandName:"Redmi",
        icon:"icons/Redmi.png",
    },
    {
        brandName:"Asus ROG",
        icon:"icons/ROG.png",
    },
    {
        brandName:"Poco",
        icon:"icons/poco.jpg",
    },
    {
        brandName:"Apple iPhone",
        icon:"icons/iPhone.png",
    },
    {
        brandName:"Samsung",
        icon:"icons/samsung.png",
    },
    {
        brandName:"OnePlus",
        icon:"icons/OnePlus.jpg",
    },
    {
        brandName:"OPPO",
        icon:"icons/OPPO.png",
    },
    {
        brandName:"MEIZU",
        icon:"icons/meizu.jpg",
    },
    {
        brandName:"Nokia",
        icon:"icons/Nokia.png",
    },
    {
        brandName:"Google",
        icon:"icons/Google.png",
    },
    {
        brandName:"Honor",
        icon:"icons/honor.jpg",
    },
    {
        brandName:"IQOO",
        icon:"icons/iqoo.jpg",
    },
    {
        brandName:"Vivo",
        icon:"icons/vivo.png",
    },
    {
        brandName:"Asus",
        icon:"icons/ASUS.png",
    },
];


class Brand extends Component {


    render(){
     return (
        <>
        <div className="row displayItoms">
            {brands.map((brand) => (
            <div className="col-md-2" id="product">
            <div className="p-2 d-flex justify-content-center"> 
                    <button className="btn btn-light icon" id="searchBand" type="button">
                    <img id="icon" src={brand.icon} alt="icon"/> 
                    </button> 
                    </div>
            </div>
            ))}
        </div>
        </>
     )
 }}

export default Brand ;