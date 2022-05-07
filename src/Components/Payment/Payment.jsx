import React from 'react';
import { Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

const Payment = ({ product, userQuanttity, DeleteSavedProduct }) => {
    const fee = 40;

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

    const Result = (() => {
        DeleteSavedProduct(product._id)
        alert("Payment Successfully")
    })

    const displayRazorpay = async (product) => {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("You are offline... Failed to load Payment");
            return;
        }

        const options = {
            key: "rzp_test_yRusAFGHsHMccG",
            currency: "INR",
            amount: (product.price * userQuanttity + fee) * 100,
            name: product.productName,
            description:
                `
            Quentity:${userQuanttity} | Spe: ${product.ram}GB / ${product.rom}GB \n
            `,
            image: `${product.file}`,

            handler: function (res) {
                Result();
            },
            prefill: {
                name: product.productName,
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return (
        <div>
            <Button onClick={() => { displayRazorpay(product) }} sx={{ minWidth: 160, ml: 3, border: 1.7, borderRadius: '10px' }} variant="outlined">
                <ShoppingCart />
                Buy Now
            </Button>
        </div>
    );
}


export default Payment;