import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  saveUserCity,
  saveUserContact,
  applyCoupon,
  createCashOrderForUser,
  saveUserProvince,
  saveUserPostalCode,
  takeUserAddress,
} from "../functions/user";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [city, setCity] = useState("");
  const [citySaved, setCitySaved] = useState(false);
  const [province, setProvince] = useState("");
  const [provinceSaved, setProvinceSaved] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [postalCodeSaved, setPostalCodeSaved] = useState(false);
  const [contact, setContact] = useState("");
  const [contactSaved, setContactSaved] = useState(false);
  const [coupon, setCoupon] = useState("");

  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
    const storedAddress = localStorage.getItem("address");
    if (storedAddress) {
      setAddress(storedAddress);
    }

    const storedCity = localStorage.getItem("city");
    if (storedCity) {
      setCity(storedCity);
    }

    const storedProvince = localStorage.getItem("province");
    if (storedProvince) {
      setProvince(storedProvince);
    }

    const storedPostalCode = localStorage.getItem("postalCode");
    if (storedPostalCode) {
      setPostalCode(storedPostalCode);
    }

    const storedContact = localStorage.getItem("contact");
    if (storedContact) {
      setContact(storedContact);
    }
  }, []);

  // ... retrieve and set other stored values in a similar way

  const emptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is Empty!");
    });
  };

  const saveAddressToDb = (e) => {
    e.preventDefault();
    console.log(saveAddressToDb);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.addressuser) {
        setAddressSaved(true);
        localStorage.setItem("address", address);
        toast.success("Address Saved Successfully!");
      }
    });
  };

  const saveCityToDb = (e) => {
    e.preventDefault();
    console.log(saveCityToDb);
    saveUserCity(user.token, city).then((res) => {
      if (res.data.cityuser) {
        setCitySaved(true);

        // Save the city to local storage
        localStorage.setItem("city", city);
      }
    });
  };

  const saveProvinceToDb = (e) => {
    e.preventDefault();
    console.log(saveProvinceToDb);
    saveUserProvince(user.token, province).then((res) => {
      if (res.data.provinceuser) {
        setProvinceSaved(true);

        // Save the province to local storage
        localStorage.setItem("province", province);
      }
    });
  };

  const savePostalCodeToDb = (e) => {
    e.preventDefault();
    console.log(savePostalCodeToDb);
    saveUserPostalCode(user.token, postalCode).then((res) => {
      if (res.data.postalcodeuser) {
        setPostalCodeSaved(true);

        // Save the postal code to local storage
        localStorage.setItem("postalCode", postalCode);
      }
    });
  };

  const saveContactToDb = (e) => {
    e.preventDefault();
    console.log(saveContactToDb);
    saveUserContact(user.token, contact).then((res) => {
      if (res.data.contactuser) {
        setContactSaved(true);

        // Save the contact to local storage
        localStorage.setItem("contact", contact);
      }
    });
  };

  const saveAllToDb = (e) => {
    e.preventDefault();
    saveAddressToDb(e);
    saveCityToDb(e);
    saveProvinceToDb(e);
    savePostalCodeToDb(e);
    saveContactToDb(e);
  };

  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }

      if (res.data.err) {
        setDiscountError(res.data.err);
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="form-control"
      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
        Apply
      </button>
    </>
  );

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      console.log("USER CASH ORDER CREATED RES ", res);
      if (res.data.ok) {
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        dispatch({
          type: "COD",
          payload: false,
        });
        emptyUserCart(user.token);

        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };

  const shippingComponent = () => {
    return (
      <Form onSubmit={saveAllToDb}>
        <Form.Group controlId="address">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address, apt, space, floor, bld."
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="province">
          <Form.Label>Province</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Province"
            value={province}
            required
            onChange={(e) => setProvince(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="contact">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Contact Number"
            value={contact}
            required
            onChange={(e) => setContact(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    );
  };

  return (
    <div className="row">
      <div className="col-md-6">
        {shippingComponent()}

        <hr />
        <h4>Got Coupon?</h4>
        <br />
        {showApplyCoupon()}
        <br />
        {discountError && <p className="bg-danger p-2">{discountError}</p>}
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Cart Total: {total}</p>

        {totalAfterDiscount > 0 && (
          <p className="bg-success p-2">
            Discount Applied: Total Payable: ${totalAfterDiscount}
          </p>
        )}

        <div className="row">
          <div className="col-md-6">
            {COD ? (
              <button
                className="btn btn-primary"
                disabled={
                  !addressSaved ||
                  !citySaved ||
                  !provinceSaved ||
                  !postalCodeSaved ||
                  !contactSaved ||
                  !products.length
                }
                onClick={createCashOrder}
              >
                Place Order
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={
                  !addressSaved ||
                  !citySaved ||
                  !provinceSaved ||
                  !postalCodeSaved ||
                  !contactSaved ||
                  !products.length
                }
                onClick={() => history.push("/payment")}
              >
                Place Order
              </button>
            )}
          </div>

          <div className="col-md-6">
            <button
              disabled={!products.length}
              onClick={emptyCart}
              className="btn btn-primary"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
