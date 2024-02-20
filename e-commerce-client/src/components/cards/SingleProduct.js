import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { AiOutlineHeart, AiOutlineShopping } from "react-icons/ai";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from "../../images/laptop.png";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;

// this is children component of Product page
const SingleProduct = ({ product, onStarClick, star }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  // redux
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  // router
  let history = useHistory();

  const { title, images, description, _id } = product;

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    if (user && user.token) {
      addToWishlist(product._id, user.token).then((res) => {
        console.log("ADDED TO WISHLIST", res.data);
        toast.success("Added to wishlist");
        history.push("/user/wishlist");
      });
    } else {
      toast.warning(" Sign in to add the product to Wishlist");
    }
  };

  return (
    <div className="d-flex justify-content-center flex-wrap gap-5 pt-5">
      <div className="col-md-6">
        {images && images.length ? (
          <Carousel
            showArrows={false}
            autoPlay
            infiniteLoop
            swipeable={true}
            showStatus={false}
          >
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card cover={<img src={Laptop} className="mb-3 card-image" />}></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on xxxx xxx xxx to learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-4">
        <div className="titlecon d-flex justify-content-center">
          <span className="title">{title}</span>
        </div>
        <br></br>
        <Card
          className="cardsp"
          actions={[
            <Tooltip placement="top" title={tooltip}>
              <div onClick={handleAddToCart}>
                <AiOutlineShopping
                  disabled={product.quantity < 1}
                  className="text-danger"
                  size={30}
                />
              </div>
            </Tooltip>,
            <div onClick={handleAddToWishlist}>
              <AiOutlineHeart className="text-info" size={30} />
              {/* {user && user.token ? "Wishlist" : "Login to wish it"} */}
            </div>,
            <RatingModal className="d-flex flex-column justify-content-center">
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="gold"
              />
            </RatingModal>,
          ]}
        >
          {product && product.ratings && product.ratings.length > 0 ? (
            showAverage(product)
          ) : (
            <div className="text-center">No rating yet</div>
          )}
          <ProductListItems product={product} />
        </Card>
      </div>
    </div>
  );
};

export default SingleProduct;
