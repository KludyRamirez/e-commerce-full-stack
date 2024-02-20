import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const { price, category, subs, shipping, color, brand, quantity, sold } =
    product;

  return (
    <div className="px-2">
      <div className="d-flex justify-content-between pt-2">
        <h6 className="text-secondary">Price</h6>
        <div className="fw-normal">${price}</div>
      </div>
      {category && (
        <div className="d-flex justify-content-between pt-4">
          <h6 className="text-secondary">Category</h6>

          <Link
            to={`/category/${category.slug}`}
            className="text-decoration-none fw-normal"
          >
            {category.name}
          </Link>
        </div>
      )}
      {subs && (
        <div className="d-flex justify-content-between pt-4">
          <h6 className="text-secondary">Sub-Category</h6>
          <div>
            {subs.map((s) => (
              <Link
                key={s._id}
                to={`/sub/${s.slug}`}
                className="ps-5 text-decoration-none"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="d-flex justify-content-between pt-4 pb-2">
        <h6 className="text-secondary">Shipping</h6>
        <div className="fw-normal">{shipping}</div>
      </div>
      <div className="d-flex justify-content-between pt-4 pb-2">
        <h6 className="text-secondary">Color</h6>
        <div className="fw-normal">{color}</div>
      </div>
      <div className="d-flex justify-content-between pt-4 pb-2">
        <h6 className="text-secondary">Brand</h6>
        <div className="fw-normal">{brand}</div>
      </div>
      <div className="d-flex justify-content-between pt-4 pb-2">
        <h6 className="text-secondary">
          {product.quantity < 1 ? "Out of Stock" : "Available"}
        </h6>
        <div className="fw-normal">{quantity}</div>
      </div>
      <div className="d-flex justify-content-between pt-4 pb-2">
        <h6 className="text-secondary">Sold</h6>
        <div className="fw-normal">{sold}</div>
      </div>
    </div>
  );
};

export default ProductListItems;
