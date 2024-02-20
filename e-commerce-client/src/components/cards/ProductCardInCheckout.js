import React from "react";
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { AiOutlineDelete } from "react-icons/ai";
import coin from "../../images/coin.png";
import medal from "../../images/medal.png";
import coin3d from "../../images/3dcoin.png";

const ProductCardInCheckout = ({ p }) => {
  const colors = ["Album", "Photocard", "Other Merchandise"];
  let dispatch = useDispatch();

  const handleColorChange = (e) => {
    console.log("color changed", e.target.value);

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });

      //  console.log('cart udpate color', cart)
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e) => {
    // console.log("available quantity", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <div className="container-fluid pb-4">
      <div className="d-flex justify-content-center flex-wrap gap-4">
        <div className="cart d-flex flex-column justify-content-center align-items-center p-3">
          {p.images.length ? (
            <ModalImage
              className="imgsizecart"
              small={p.images[0].url}
              large={p.images[0].url}
            />
          ) : (
            <ModalImage className="imgsizecart" small={laptop} large={laptop} />
          )}
        </div>

        <div className="cart d-flex flex-column justify-content-center align-items-center">
          <div className="ctitle">{p.title}</div>
        </div>
        <div className="cart d-flex flex-column justify-content-center align-items-center">
          <img className="cicons mb-3" src={coin}></img>₱{p.price}
        </div>

        <div className="cart d-flex flex-column justify-content-center align-items-center">
          <img className="cicons mb-3" src={medal} />
          {p.brand}
        </div>
        <div className="cart d-flex flex-column justify-content-center align-items-center p-3">
          <img className="cicons mb-3" src={coin3d} />

          <select
            onChange={handleColorChange}
            name="color"
            className="form-control"
          >
            {p.color ? (
              <option value={p.color}>{p.color}</option>
            ) : (
              <option>Select</option>
            )}
            {colors
              .filter((c) => c !== p.color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </div>
        <div className="cart d-flex flex-column justify-content-center align-items-center p-3">
          <div>How many?</div>
          <br />
          <input
            type="number"
            className="form-control"
            value={p.count}
            onChange={handleQuantityChange}
          />
        </div>
        <div className="cart d-flex flex-column justify-content-center align-items-center">
          <div>Shipping</div>
          <br />
          {p.shipping === "Door-to-Door Delivery" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </div>
        <div className="minicart d-flex flex-column justify-content-center align-items-center">
          <AiOutlineDelete
            onClick={handleRemove}
            className="text-danger pointer"
            size={20}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCardInCheckout;
