import axios from "axios";

export const userCart = async (cart, authtoken) =>
  await axios.post(
    `https://bananauyu.up.railway.app/api/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserCart = async (authtoken) =>
  await axios.get(`https://bananauyu.up.railway.app/api/user/cart`, {
    headers: {
      authtoken,
    },
  });

export const emptyUserCart = async (authtoken) =>
  await axios.delete(`https://bananauyu.up.railway.app/api/user/cart`, {
    headers: {
      authtoken,
    },
  });

export const saveUserAddress = async (authtoken, address) =>
  await axios.post(
    `https://bananauyu.up.railway.app/api/user/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );

export const saveUserCity = async (authtoken, city) =>
  await axios.post(
    `https://bananauyu.up.railway.app/api/user/city`,
    { city },
    {
      headers: {
        authtoken,
      },
    }
  );

export const saveUserProvince = async (authtoken, province) =>
  await axios.post(
    `https://bananauyu.up.railway.app/api/user/province`,
    { province },
    {
      headers: {
        authtoken,
      },
    }
  );

export const saveUserPostalCode = async (authtoken, postalcode) =>
  await axios.post(
    `https://bananauyu.up.railway.app/api/user/postalcode`,
    { postalcode },
    {
      headers: {
        authtoken,
      },
    }
  );

export const saveUserContact = async (authtoken, contact) =>
  await axios.post(
    `https://bananauyu.up.railway.app/api/user/contact`,
    { contact },
    {
      headers: {
        authtoken,
      },
    }
  );

export const applyCoupon = async (authtoken, coupon) =>
  await axios.post(
    `https://bananauyu.up.railway.app/api/user/cart/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );

export const createOrder = async (stripeResponse, authtoken) =>
  await axios.post(
    `https://bananauyu.up.railway.app/api/user/order`,
    { stripeResponse },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserOrders = async (authtoken) =>
  await axios.get(`https://bananauyu.up.railway.app/api/user/orders`, {
    headers: {
      authtoken,
    },
  });

export const getWishlist = async (authtoken) =>
  await axios.get(`https://bananauyu.up.railway.app/api/user/wishlist`, {
    headers: {
      authtoken,
    },
  });

export const removeWishlist = async (productId, authtoken) =>
  await axios.put(
    `https://bananauyu.up.railway.app/api/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const addToWishlist = async (productId, authtoken) =>
  await axios.post(
    `https://bananauyu.up.railway.app/api/user/wishlist`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );

export const createCashOrderForUser = async (
  authtoken,
  COD,
  couponTrueOrFalse
) =>
  await axios.post(
    `https://bananauyu.up.railway.app/api/user/cash-order`,
    { couponApplied: couponTrueOrFalse, COD },
    {
      headers: {
        authtoken,
      },
    }
  );
