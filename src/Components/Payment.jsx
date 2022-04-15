import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

const Payment = ({product}) => {
    const fee = 40;
    const tax = 20;
    
//----------------------* Payment Function *---------------------//

    const loadScript = (src) => {
        return new Promise((resovle) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resovle(true);
        };

        script.onerror = () => {
            resovle(false);
        };

        document.body.appendChild(script);
        });
    };

    const displayRazorpay = async (product) => {
        const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
        alert("You are offline... Failed to load Razorpay SDK");
        return;
        }
        
        const options = {
        key: "rzp_test_yRusAFGHsHMccG",
        currency: "INR",
        amount: (product.price*product.userQuanttity+tax+fee)*100,
        name: product.productName,
        description: 
        `
        Quentity:${product.userQuanttity} | Spe: ${product.ram}GB / ${product.rom}GB \n
            
        `,
        image:`${product.file}`,

        handler: function (response) {
            alert("Payment Successfully");
        },
        prefill: {
            name: product.productName,
        },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return (
        <div>            
            <Button onClick={()=>{displayRazorpay(product)}} sx={{ minWidth:160, ml:3, border:1.7, borderRadius:'10px'}} variant="outlined">
                <ShoppingCart />
                Buy Now
            </Button>
        </div>
    );
}

Payment.propTypes = {
    product: PropTypes.string.isRequired
};

export default Payment;