import axios from "axios";

export const createPaymentIntent = (authtoken, coupon) =>
  axios.post(
    `https://bananauyu.up.railway.app/api/create-payment-intent`,
    { couponApplied: coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
