import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
import { BsCompass } from "react-icons/bs";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  const itemRender = (_, type, originalElement) => {
    if (type === "page") {
      return <BsCompass size={"16px"} />;
    }
    if (type === "prev") {
      return <AiOutlineCaretLeft size={"15px"} />;
    }
    if (type === "next") {
      return <AiOutlineCaretRight size={"15px"} />;
    }
    return originalElement;
  };

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("sold", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={30}
            onChange={(value) => setPage(value)}
            itemRender={itemRender}
          />
        </nav>
      </div>
    </>
  );
};

export default BestSellers;
