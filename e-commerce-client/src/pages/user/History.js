import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import { useSelector } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/order/Invoice";

const History = () => {
  const [keyword, setKeyword] = useState("");
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const searched = (keyword) => (order) =>
    order && order.orderStatus.toLowerCase().includes(keyword);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Product Type</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((order, i) => (
          <tr key={i}>
            <td>
              <b>{order && order.product && order.product.title}</b>
            </td>
            <td>{order && order.product && order.product.price}</td>
            <td>{order && order.product && order.product.brand}</td>
            <td>{order && order.product && order.product.color}</td>
            <td>{order.product && order.count}</td>
            <td>
              {order &&
              order.product &&
              order.product.shipping === "Door-to-Door Delivery" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="invoice.pdf"
      className="btn btn-sm btn-block btn-outline-primary"
    >
      Download PDF
    </PDFDownloadLink>
  );

  const showEachOrders = () =>
    orders
      .reverse()
      .filter(searched(keyword))
      .map((order, i) => (
        <div key={i} className="m-5 p-3 card">
          <ShowPaymentInfo order={order} />
          {showOrderInTable(order)}
          <div className="row">
            <div className="col">{showDownloadLink(order)}</div>
          </div>
        </div>
      ));

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <UserNav />
          </div>
          <div className="col text-center">
            <input
              type="search"
              placeholder="Filter"
              value={keyword}
              onChange={handleSearchChange}
              className="form-control mb-4"
            />
            <h4>
              {orders.length > 0
                ? "User purchase orders"
                : "No purchase orders"}
            </h4>
            {showEachOrders()}
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
