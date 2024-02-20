import axios from "axios";

export const getCoupons = async () =>
  await axios.get(`https://bananauyu.up.railway.app/api/coupons`);

export const removeCoupon = async (couponId, authtoken) =>
  await axios.delete(
    `https://bananauyu.up.railway.app/api/coupon/${couponId}`,
    {
      headers: {
        authtoken,
      },
    }
  );

export const createCoupon = async (coupon, authtoken) =>
  await axios.post(
    `https://bananauyu.up.railway.app/api/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
