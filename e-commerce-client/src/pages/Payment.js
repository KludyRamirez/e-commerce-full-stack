import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";
import "../stripe.css";

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(
  "pk_test_51N16BPKFTkD9picl1ZgrbruO3plTmOHeD3s67SWIju3Aw9Y3dadh2YNUGJTgE6hBqTWeAc47o3esAuEuSNKoSBnA00NVJiME3c"
);

const Payment = () => {
  return (
    <div className="container p-5 text-center">
      <h4>Complete your purchase</h4>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
